import {
    // SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    // SEND_ORDER_FAILED,
    CLEAR_ORDER_DETAILS
} from '../actions/order-details';


const orderState: any = {
    ingredients: [],
    orderData: {}
}

export const orderReducer = (state:any = orderState, action:any) => {
    switch (action.type){
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderData: action.json
            }
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ingredients: [],
                orderData: {}
            }
        }
        default: {
            return state;
        }
    }
}
