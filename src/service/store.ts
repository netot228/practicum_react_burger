import { rootReducer } from "../redux/reducers";
import { configureStore } from "@reduxjs/toolkit";

import { createWSMiddleware } from "../redux/middleware/ws_middleware";
import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
} from "../redux/actions/feed";

import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_ERROR,
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_GET_MESSAGE,
} from "../redux/actions/user-feed";

const WSFeedMiddleware = createWSMiddleware({
    url: "wss://norma.nomoreparties.space/orders/all",
    needToken: false,
    twActions: {
        connect: WS_FEED_CONNECT,
        error: WS_FEED_ERROR,
        close: WS_FEED_CLOSE,
        getMessage: WS_FEED_GET_MESSAGE,
    },
});

const WSUserFeedMiddleware = createWSMiddleware({
    url: "wss://norma.nomoreparties.space/orders",
    needToken: true,
    twActions: {
        connect: WS_USER_FEED_CONNECT,
        error: WS_USER_FEED_ERROR,
        close: WS_USER_FEED_CLOSE,
        getMessage: WS_USER_FEED_GET_MESSAGE,
    },
});

const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(WSFeedMiddleware)
            .concat(WSUserFeedMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
