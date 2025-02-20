import { AppDispatch } from "../../service/store";
import { INGREDIENT_DATA_ENDPOINT } from "../../service/api-endpoints";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" =
    "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" =
    "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" =
    "GET_INGREDIENTS_FAILED";

export const INCREASE_INGREDIENT_ITEM: "INCREASE_INGREDIENT_ITEM" =
    "INCREASE_INGREDIENT_ITEM";
export const DECREASE_INGREDIENT_ITEM: "DECREASE_INGREDIENT_ITEM" =
    "DECREASE_INGREDIENT_ITEM";

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });

        fetch(INGREDIENT_DATA_ENDPOINT)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Error: ${response.status}`);
                }
            })
            .then((json) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: json.data,
                });
            })
            .catch((error) => {
                console.log("Данные с ингредиентами не поступили");
                console.error(error);
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}
