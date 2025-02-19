import { AppDispatch } from "../../service/store";
import { SEND_ORDER_ENDPOINT } from "../../service/api-endpoints";

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";

export const CLEAR_ORDER_DETAILS: "CLEAR_ORDER_DETAILS" = "CLEAR_ORDER_DETAILS";

export function sendOrder(order: (string | number)[]) {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: SEND_ORDER_REQUEST,
            order,
        });
        fetch(SEND_ORDER_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                Authorization: localStorage.accessToken,
            },
            body: JSON.stringify({ ingredients: order }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then((json) => {
                // console.dir("SEND_ORDER_SUCCESS");
                console.dir(json);

                console.log(JSON.stringify(json));

                dispatch({
                    type: SEND_ORDER_SUCCESS,
                    json,
                });
            })
            .catch((error) => {
                console.log("Что-то пошло не так");
                console.error(error);
                dispatch({
                    type: SEND_ORDER_FAILED,
                    notice: "Что-то пошло не так, ваш заказ не был создан",
                    error,
                });
            });
    };
}
