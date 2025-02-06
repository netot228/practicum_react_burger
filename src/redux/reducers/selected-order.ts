import {
    SET_SELECTED_ORDER,
    CLEAR_SELECTED_ORDER,
} from "../actions/selected-order";

import { SelectedOrderState, SelectedOrderAction } from "../../service/types";

const selectedOrder: SelectedOrderState = {
    order: null,
};

export const selectedOrderReducer = (
    state: SelectedOrderState = selectedOrder,
    action: SelectedOrderAction
) => {
    switch (action.type) {
        case SET_SELECTED_ORDER: {
            return {
                ...state,
                order: action.order,
            };
        }
        case CLEAR_SELECTED_ORDER: {
            return {
                ...state,
                order: null,
            };
        }
        default: {
            return state;
        }
    }
};
