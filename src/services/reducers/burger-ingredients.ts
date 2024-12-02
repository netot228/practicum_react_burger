import {IngredientsAction, IngredientsState} from '../../utils/types';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';



const ingredientsState: IngredientsState = {

    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false

}


export const ingredientsReducer = (state: IngredientsState = ingredientsState, action: IngredientsAction) => {
    switch (action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: false,
                ingredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsRequest: false,
                ingredientsFailed: true
            }
        }
        default: {
            return state;
        }
    }
}