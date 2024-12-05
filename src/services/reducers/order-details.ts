import {OrderState, OrderAction} from '../../utils/types';

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLEAR_ORDER_DETAILS
} from '../actions/order-details';


const orderState:OrderState  = {
    ingredients: [],
    orderData: null,
    notice: ''
}

export const orderReducer = (state:OrderState = orderState, action:OrderAction) => {
    switch (action.type){
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                ingredients: action.order
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderData: action.json
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ingredients: [],
                orderData: {},
                notice: action.notice
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ingredients: [],
                orderData: {},
                notice: '',
                error: ''
            }
        }
        default: {
            return state;
        }
    }
}
