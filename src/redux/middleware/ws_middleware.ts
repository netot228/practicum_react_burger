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
        sendMessage: string;
        // sendMessage: string;
        // onConnected: string;
        // onDisconnected: string;
        // onMessageReceived: string;
        // onError: string;
    };
};

export const createWSMiddleware = (options: TWS_options): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: TAppAction) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { twActions, needToken, url } = options;

            switch (type) {
                case twActions.connect: {
                    if (socket !== null) {
                        console.warn("WebSocket is already connected.");
                        return;
                    }

                    if (needToken) {
                        // orderHistory socket here
                    } else {
                        socket = new WebSocket(url);
                    }

                    if (socket) {
                        socket = new WebSocket(options.url);

                        socket.onopen = (event) => {
                            console.log("socket is open");
                            console.dir(event);

                            dispatch({ type: twActions.connect });
                            // options.onOpen?.(event);
                            // store.dispatch({ type: actions.onConnected });
                        };

                        socket.onclose = (event) => {
                            console.log("socket is close");
                            console.dir(event);

                            dispatch({ type: twActions.close });
                        };

                        socket.onmessage = (event) => {
                            console.log("ws has message");
                            console.dir(event);

                            if (!event.data) return;
                            let data = JSON.parse(event.data);

                            console.dir(data);
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

                        break;
                    }

                    break;
                }

                case twActions.close: {
                    if (socket !== null) {
                        socket.close();
                    }
                    socket = null;
                    break;
                }

                default:
                    break;
            }

            return next(action);
        };
    }) as Middleware;
};
