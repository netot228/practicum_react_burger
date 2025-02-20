import { AppDispatch } from "../../service/store";
import { requestHandler } from "../../service/request-api";

import { GET_CURRENT_ORDER } from "../../service/api-endpoints";

export const SET_SELECTED_ORDER: "SET_SELECTED_ORDER" = "SET_SELECTED_ORDER";
export const CLEAR_SELECTED_ORDER: "CLEAR_SELECTED_ORDER" =
    "CLEAR_SELECTED_ORDER";

export const getOrder =
    (number: string | number) => async (dispatch: AppDispatch) => {
        let requestUrl = `${GET_CURRENT_ORDER}${number}/`;

        return await requestHandler(requestUrl, {})
            .then((json) => {
                if (json.success && json.orders.length === 1) {
                    let order = json.orders[0];
                    dispatch({
                        type: SET_SELECTED_ORDER,
                        order: order,
                    });
                }

                return json;
            })
            .catch((error) => {
                console.log(
                    "При получении детализации заказа Что-то пошло не так"
                );
                console.error(error);
                return error;
            });
    };
