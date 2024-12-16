import {
    REGISTER_USER,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS
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
}

export const authReducer = (state:UserState = initState, action:UserAction) => {
    switch (action.type){
        case REGISTER_USER_REQUEST: {
            return {
                ...state
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }
        case RESET_PASSWORD: {
            return {
                ...state,
                resetPassword: true
            }
        }
        default: {
            return state;
        }
    }
}
