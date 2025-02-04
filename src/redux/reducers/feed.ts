import { WS_FeedState, WS_FeedAction } from "../../service/types";

import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE,
} from "../actions/feed";

const wsFeedState: WS_FeedState = {
    success: false,
    error: false,
    orders: [],
    total: 0,
    totalToday: 0,
};

export const feedReduscer = (
    state: WS_FeedState = wsFeedState,
    action: WS_FeedAction
) => {
    switch (action.type) {
        case WS_FEED_CONNECT: {
            return {
                ...state,
                success: true,
            };
        }
        case WS_FEED_GET_MESSAGE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
};
