import {ConstructorState, ConstructorAction} from '../../utils/types';
import {ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT, SORT_TOPPING} from '../actions/burger-constructor';

const constructorState: ConstructorState = {
    topping: [],
    bun: null
}

export const constructorReducer = (state: ConstructorState = constructorState, action: ConstructorAction) => {
    switch (action.type){
        case ADD_INGREDIENT: {
            return {
                ...state,
                topping: [...state.topping, {...action.ingredient, uid:action.uid }]
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingredient
            }
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                topping: [...state.topping].filter(el=>el.uid!==action.uid)
            }
        }
        case SORT_TOPPING: {
            // const zlo = state.topping[action.index];
            // const
            return {
                ...state,
                // topping: zlo
            }
        }
        default: {
            return state;
        }
    }
}