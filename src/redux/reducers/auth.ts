import {
    SEND_REQUEST,
    REGISTER_USER_FAILED,
    RESET_PASSWORD,
    GET_USER_DATA,
    SET_TOKEN,
    LOGIN_USER,
    LOGOUT_USER,
} from "../actions/auth";

import { UserState, UserAction } from "../../service/types";

const initState = {
    success: false,
    accessToken: "",
    refreshToken: "",
    user: {
        email: "",
        name: "",
    },

    requestRegister: false,
};

export const authReducer = (
    state: UserState = initState,
    action: UserAction
) => {
    switch (action.type) {
        case SEND_REQUEST: {
            return {
                ...state,
                requestRegister: true,
            };
        }

        case REGISTER_USER_FAILED: {
            return {
                ...initState,
            };
        }

        case RESET_PASSWORD: {
            return {
                ...state,
            };
        }

        case SET_TOKEN: {
            localStorage.refreshToken = action.payload.refreshToken
                ? action.payload.refreshToken
                : localStorage.refreshToken
                ? localStorage.refreshToken
                : "";
            localStorage.tokenTimeout = new Date().getTime().toString();
            localStorage.accessToken = action.payload.accessToken
                ? action.payload.accessToken
                : localStorage.accessToken
                ? localStorage.accessToken
                : "";
            return {
                ...state,
                ...action.payload,
            };
        }

        case LOGIN_USER: {
            localStorage.userData = action.payload.user
                ? JSON.stringify(action.payload.user)
                : localStorage.userData
                ? localStorage.userData
                : "";

            localStorage.refreshToken = action.payload.refreshToken
                ? action.payload.refreshToken
                : localStorage.refreshToken
                ? localStorage.refreshToken
                : "";

            localStorage.accessToken = action.payload.accessToken
                ? action.payload.accessToken
                : localStorage.accessToken
                ? localStorage.accessToken
                : "";

            localStorage.tokenTimeout = new Date().getTime().toString();
            localStorage.cosmicSecret =
                action.payload.pass && typeof action.payload.pass === "string"
                    ? btoa(action.payload.pass)
                    : localStorage.cosmicSecret
                    ? localStorage.cosmicSecret
                    : "";

            return {
                ...state,
                ...action.payload,
                requestRegister: false,
            };
        }

        case LOGOUT_USER: {
            return {
                ...initState,
            };
        }

        case GET_USER_DATA: {
            localStorage.userData = action.payload.user
                ? JSON.stringify(action.payload.user)
                : localStorage.userData
                ? localStorage.userData
                : "";

            localStorage.cosmicSecret =
                action.payload.pass && typeof action.payload.pass === "string"
                    ? btoa(action.payload.pass)
                    : localStorage.cosmicSecret
                    ? localStorage.cosmicSecret
                    : "";

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
