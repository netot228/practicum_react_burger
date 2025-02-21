import {
    SelectedIngredientState,
    SelectedIngredientAction,
} from "../../service/types";
import {
    SET_SELECTED_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT,
} from "../actions/ingredient-details";

export const selectedIngredient: SelectedIngredientState = {
    ingredient: null,
};

export const selectedIngredientReducer = (
    state: SelectedIngredientState = selectedIngredient,
    action: SelectedIngredientAction
) => {
    switch (action.type) {
        case SET_SELECTED_INGREDIENT: {
            return {
                ...state,
                ingredient: action.ingredient,
            };
        }
        case CLEAR_SELECTED_INGREDIENT: {
            return {
                ...state,
                ingredient: null,
            };
        }
        default: {
            return state;
        }
    }
};
