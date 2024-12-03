import {
    // SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    // SEND_ORDER_FAILED
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
        default: {
            return state;
        }
    }
}

