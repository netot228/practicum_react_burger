import { OrderState, OrderAction } from "../../service/types";

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLEAR_ORDER_DETAILS,
} from "../actions/order-details";

const orderState: OrderState = {
    ingredients: [],
    orderData: { name: "", order: { number: 0 }, success: false },
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
                ingredients: [],
                orderData: { name: "", order: { number: 0 }, success: false },
                notice: action.notice,
                success: false,
                processing: false,
            };
        }
        case CLEAR_ORDER_DETAILS: {
            return {
                ingredients: [],
                orderData: { name: "", order: { number: 0 }, success: false },
                notice: "",
                error: "",
                success: false,
                processing: false,
            };
        }
        default: {
            return state;
        }
    }
};
