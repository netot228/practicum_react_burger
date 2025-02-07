import { WS_FeedState, WS_FeedAction } from "../../service/types";

import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_ERROR,
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_GET_MESSAGE,
} from "../actions/user-feed";

const wsUserFeedState: WS_FeedState = {
    success: false,
    error: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const userFeedReduscer = (
    state: WS_FeedState = wsUserFeedState,
    action: WS_FeedAction
) => {
    switch (action.type) {
        case WS_USER_FEED_CONNECT: {
            return {
                ...state,
                error: false,
                success: true,
            };
        }
        case WS_USER_FEED_GET_MESSAGE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case WS_USER_FEED_CLOSE: {
            return {
                ...wsUserFeedState,
            };
        }
        case WS_USER_FEED_ERROR: {
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
