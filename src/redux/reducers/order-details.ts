import { OrderState, OrderAction } from "../../service/types";

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLEAR_ORDER_DETAILS,
} from "../actions/order-details";

export const orderState: OrderState = {
    ingredients: [],
    // orderData: { name: "", order: { number: 0 }, success: false },
    orderData: null,
    notice: "",
    success: false,
    processing: false,
};

export const orderReducer = (
    state: OrderState = orderState,
    action: OrderAction
) => {
    switch (action.type) {
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                ingredients: action.order,
                processing: true,
            };
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderData: action.json,
                success: true,
                processing: false,
            };
        }
        case SEND_ORDER_FAILED: {
            return {
                ...orderState,
            };
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ...orderState,
            };
        }
        default: {
            return state;
        }
    }
};
