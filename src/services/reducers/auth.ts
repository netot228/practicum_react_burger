import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,

    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS,

    GET_USER_DATA,
    SET_TOKEN,

    LOGIN_USER,
    LOGOUT_USER
} from '../actions/auth';

import { UserData, UserState, UserAction } from '../../utils/types';

const initState = {
    success: false,
    accessToken: '',
    refreshToken: '',
    user: {
        email: '',
        name: ''
    },

    resetPassword: false,
    registerFailed: false,
    requestRegister: false
}

export const authReducer = (state:UserState = initState, action:UserAction) => {
    switch (action.type){

        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                requestRegister: true
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerFailed: true,
                requestRegister: false,
                resetPassword: false

            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                registerFailed: false,
                requestRegister: false

            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                resetPassword: true
            }
        }

        case SET_TOKEN: {
            return {
                ...state,
                ...action.payload,
            }
        }

        case LOGIN_USER: {
            return {
                ...state,
                ...action.payload,
                requestRegister: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...initState
            }
        }
        case GET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            }
        }

        default: {
            return state;
        }
    }
}
