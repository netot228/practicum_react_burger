import { DATA_IngredientsArray, DATA_IngredientItem } from '../../service/data';

import * as actions from '../actions/burger-ingredients';
import { ingredientsState, ingredientsReducer } from './burger-ingredients';



const expectedIngredientItems = {
    ...ingredientsState,
    ingredients: [
        ...DATA_IngredientsArray.map(ingredient => {
            if (ingredient._id === DATA_IngredientItem._id) {
                return {
                    ...ingredient,
                    qnt: ingredient.qnt + 1
                }
            } else {
                return ingredient
            }
        })
    ]
}

const expectedDecreasedItems = {
    ...ingredientsState,
    ingredients: [
        ...DATA_IngredientsArray.map(ingredient => {
            if (ingredient._id === DATA_IngredientItem._id) {
                return {
                    ...ingredient,
                    qnt: ingredient.qnt - 1
                }
            } else {
                return ingredient
            }
        })
    ]
}

const ingredientStateWithItems = {
    ...ingredientsState,
    ingredients: DATA_IngredientsArray
}


describe('проверка ингредиентов', () => {

    it('Проверяем начальное состояние ингредиентов', () => {
        expect(
            ingredientsReducer(undefined, {})
        ).toEqual(ingredientsState)
    })

    it('Создание запроса на ингредиенты', () => {
        expect(
            ingredientsReducer(ingredientsState, { type: actions.GET_INGREDIENTS_REQUEST })
        ).toEqual({
            ...ingredientsState,
            ingredientsRequest: true
        })
    })

    it('Список ингредиентов получен', () => {
        expect(
            ingredientsReducer(ingredientsState, {
                type: actions.GET_INGREDIENTS_SUCCESS,
                ingredients: DATA_IngredientsArray
            })
        ).toEqual({
            ...ingredientsState,
            ingredientsRequest: false,
            ingredientsFailed: false,
            ingredients: DATA_IngredientsArray

        })
    })

    it('Запрос на ингредиенты закончился неудачей', () => {
        expect(
            ingredientsReducer(ingredientsState, { type: actions.GET_INGREDIENTS_FAILED })
        ).toEqual({
            ...ingredientsState,
            ingredientsRequest: false,
            ingredientsFailed: true,
        })
    })

    it('Увеличение порции ингредиента', () => {
        expect(
            ingredientsReducer(ingredientStateWithItems, {
                type: actions.INCREASE_INGREDIENT_ITEM,
                ingredient: DATA_IngredientItem
            })
        ).toEqual({
            ...expectedIngredientItems
        })
    })

    it('Уменьшение порции ингредиента', () => {
        expect(
            ingredientsReducer(ingredientStateWithItems, {
                type: actions.DECREASE_INGREDIENT_ITEM,
                ingredient: DATA_IngredientItem
            })
        ).toEqual({
            ...expectedDecreasedItems
        })
    })

})