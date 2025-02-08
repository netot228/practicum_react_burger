import type { Middleware, MiddlewareAPI } from "redux";
import type { RootState, AppDispatch } from "../../service/store";

import { TAppAction } from "../../service/types";

type TWS_options = {
    url: string;
    needToken: boolean;
    twActions: {
        connect: string;
        error: string;
        close: string;
        getMessage: string;
    };
};

export const createWSMiddleware = (options: TWS_options): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        let keepConnection = false;
        let reconnectTimeout: number = 0;

        return (next) => (action: TAppAction) => {
            const { dispatch } = store;
            const { type } = action;
            const { twActions, needToken, url } = options;

            switch (type) {
                case twActions.connect: {
                    if (socket !== null) {
                        console.warn("WebSocket is already connected.");
                        return;
                    }

                    const connectToSocket = () => {
                        if (needToken) {
                            
                            let token = localStorage.accessToken.replace(
                                /^Bearer /,
                                ""
                            );
                            socket = new WebSocket(`${url}?token=${token}`);
    
                        } else {
                            socket = new WebSocket(url);
                        }
    
                        if (socket) {
                            keepConnection = true;
                            socket.onopen = (event) => {
                                console.log("socket is open");
                                dispatch({ type: twActions.connect });
                            };
    
                            socket.onclose = (event) => {
                                console.log("socket is close");
                                dispatch({ type: twActions.close });

                                if(keepConnection){
                                    reconnectTimeout = window.setTimeout(()=>{
                                        connectToSocket();
                                    }, 1000)
                                }
                            };
    
                            socket.onmessage = (event) => {
                                // console.log("ws has message");
                                // console.dir(event);
    
                                if (!event.data) return;
                                let data = JSON.parse(event.data);
    
                                dispatch({
                                    type: twActions.getMessage,
                                    payload: data,
                                });
                            };
    
                            socket.onerror = (event) => {
                                console.error("socket has error");
                                console.dir(event);
    
                                dispatch({ type: twActions.error });
                            };
                        }
                    }
                    
                    connectToSocket();
                    break;
                }

                case twActions.close: {
                    if (socket !== null) {
                        socket.close();
                    }
                    socket = null;
                    keepConnection = false;
                    reconnectTimeout = 0;
                    break;
                }

                default:
                    break;
            }

            return next(action);
        };
    }) as Middleware;
};
