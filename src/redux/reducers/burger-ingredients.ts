import { IngredientsAction, IngredientsState } from "../../service/types";

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENT_ITEM,
    DECREASE_INGREDIENT_ITEM,
} from "../actions/burger-ingredients";

const ingredientsState: IngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
    selectedIngredient: null,
};

export const ingredientsReducer = (
    state: IngredientsState = ingredientsState,
    action: IngredientsAction
) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true,
            };
        }
        case DECREASE_INGREDIENT_ITEM: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((ingredient) =>
                    ingredient._id === action.ingredient._id
                        ? {
                              ...ingredient,
                              qnt:
                                  ingredient.qnt &&
                                  action.ingredient.type !== "bun"
                                      ? ingredient.qnt - 1 >= 0
                                          ? ingredient.qnt - 1
                                          : 0
                                      : 0,
                          }
                        : ingredient
                ),
            };
        }
        case INCREASE_INGREDIENT_ITEM: {
            return {
                ...state,
                ingredients: [...state.ingredients].map((ingredient) =>
                    ingredient._id === action.ingredient._id
                        ? {
                              ...ingredient,
                              qnt:
                                  ingredient.qnt &&
                                  action.ingredient.type !== "bun"
                                      ? ingredient.qnt + 1
                                      : 1,
                          }
                        : ingredient
                ),
            };
        }
        default: {
            return state;
        }
    }
};
