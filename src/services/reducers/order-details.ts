import {OrderState, OrderAction} from '../../utils/types';

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLEAR_ORDER_DETAILS
} from '../actions/order-details';


const orderState:OrderState  = {
    ingredients: [],
    orderData: {name:'', order:{number:0},success:false},
    notice: '',
    success: false
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
                orderData: action.json,
                success: true
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ingredients: [],
                orderData:  {name:'', order:{number:0},success:false},
                notice: action.notice,
                success: false
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ingredients: [],
                orderData: {name:'', order:{number:0},success:false},
                notice: '',
                error: '',
                success: false
            }
        }
        default: {
            return state;
        }
    }
}
