import {ConstructorState, ConstructorAction} from '../../utils/types';

// import {
//     GET_INGREDIENTS_REQUEST,
//     GET_INGREDIENTS_SUCCESS,
//     GET_INGREDIENTS_FAILED
// } from '../actions/burger-ingredients';

import {ADD_INGREDIENT} from '../actions/burger-constructor';



const constructorState: ConstructorState = {
    ingredients: [
        {
            "_id":"60666c42cc7b410027a1a9b1",
            "name":"Краторная булка N-200i",
            "type":"bun",
            "proteins":80,
            "fat":24,
            "carbohydrates":53,
            "calories":420,
            "price":1255,
            "image":"https://code.s3.yandex.net/react/code/bun-02.png",
            "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v":0,
            "qnt": 1
         }
    ]
}


export const constructorReducer = (state: ConstructorState = constructorState, action: ConstructorAction) => {
    switch (action.type){
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [...state.ingredients, action.ingredient]
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