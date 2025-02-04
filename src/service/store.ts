import { rootReducer } from "../redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

import { createWSMiddleware } from "../redux/middleware/ws_middleware";
import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE,
} from "../redux/actions/feed";

const WSFeedMiddleware = createWSMiddleware({
    url: "wss://norma.nomoreparties.space/orders/all",
    needToken: false,
    twActions: {
        connect: WS_FEED_CONNECT,
        error: WS_FEED_ERROR,
        close: WS_FEED_CLOSE,
        getMessage: WS_FEED_GET_MESSAGE,
        sendMessage: WS_FEED_SEND_MESSAGE,
    },
});

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //     serializableCheck: false,
    // }),
    // getDefaultMiddleware().concat(WSFeedMiddleware),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(WSFeedMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
