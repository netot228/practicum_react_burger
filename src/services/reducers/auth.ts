import {
    SEND_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    RESET_PASSWORD,
    GET_USER_DATA,
    SET_TOKEN,
    LOGIN_USER,
    LOGOUT_USER
} from '../actions/auth';

import { UserState, UserAction } from '../../utils/types';

const initState = {
    success: false,
    accessToken: '',
    refreshToken: '',
    user: {
        email: '',
        name: ''
    },

    requestRegister: false
}

export const authReducer = (state:UserState = initState, action:UserAction) => {
    switch (action.type){

        case SEND_REQUEST: {
            return {
                ...state,
                requestRegister: true
            }
        }
        
        case REGISTER_USER_FAILED: {
            return {
                ...initState

            }
        }

        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                ...action.payload,
                requsting: false

            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
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
                requsting: false
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
