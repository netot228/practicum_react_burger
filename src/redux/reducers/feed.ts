import { WS_FeedState, WS_FeedAction } from "../../service/types";

import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
} from "../actions/feed";

export const wsFeedState: WS_FeedState = {
    success: false,
    error: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const feedReducer = (
    state: WS_FeedState = wsFeedState,
    action: WS_FeedAction
) => {
    switch (action.type) {
        case WS_FEED_CONNECT: {
            return {
                ...state,
                error: false,
                success: true,
            };
        }
        case WS_FEED_GET_MESSAGE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case WS_FEED_CLOSE: {
            return {
                ...wsFeedState,
            };
        }
        case WS_FEED_ERROR: {
            return {
                ...state,
                error: true,
            };
        }
        default: {
            return state;
        }
    }
};
