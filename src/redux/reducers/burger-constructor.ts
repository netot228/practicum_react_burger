import { ConstructorState, ConstructorAction } from "../../service/types";
import {
    ADD_INGREDIENT,
    ADD_BUN,
    REMOVE_INGREDIENT,
    SORT_TOPPING,
    CLEAR_BURGER,
} from "../actions/burger-constructor";

const constructorState: ConstructorState = {
    topping: [],
    bun: null,
};

export const constructorReducer = (
    state: ConstructorState = constructorState,
    action: ConstructorAction
) => {
    switch (action.type) {
        case ADD_INGREDIENT: {
            return {
                ...state,
                topping: [
                    ...state.topping,
                    { ...action.ingredient, uid: action.uid },
                ],
            };
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.ingredient,
            };
        }
        case REMOVE_INGREDIENT: {
            return {
                ...state,
                topping: [...state.topping].filter(
                    (el) => el.uid !== action.uid
                ),
            };
        }
        case SORT_TOPPING: {
            const newToppingOrder = [...state.topping];
            newToppingOrder[action.moveItemToPos] = newToppingOrder.splice(
                action.moveItemFromPos,
                1,
                newToppingOrder[action.moveItemToPos]
            )[0];

            return {
                ...state,
                topping: newToppingOrder,
            };
        }
        case CLEAR_BURGER: {
            return {
                ...state,
                topping: [],
                bun: null,
            };
        }
        default: {
            return state;
        }
    }
};
