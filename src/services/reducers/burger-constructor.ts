import {ConstructorState, ConstructorAction} from '../../utils/types';

// import {
//     GET_INGREDIENTS_REQUEST,
//     GET_INGREDIENTS_SUCCESS,
//     GET_INGREDIENTS_FAILED
// } from '../actions/burger-ingredients';

import {ADD_INGREDIENT, ADD_BUN} from '../actions/burger-constructor';



const constructorState: ConstructorState = {
    topping: [],
    bun: null
}


export const constructorReducer = (state: ConstructorState = constructorState, action: ConstructorAction) => {
    switch (action.type){
        case ADD_INGREDIENT: {
            return {
                ...state,
                topping: [...state.topping, action.ingredient]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingredient
            }
        }
    //     case GET_INGREDIENTS_SUCCESS: {
    //         return {
    //             ...state,
    //             ingredientsRequest: false,
    //             ingredientsFailed: false,
    //             ingredients: action.ingredients
    //         }
    //     }
    //     case GET_INGREDIENTS_FAILED: {
    //         return {
    //             ...state,
    //             ingredientsRequest: false,
    //             ingredientsFailed: true
    //         }
    //     }
        default: {
            return state;
        }
    }
}