import * as actions from "../actions/ingredient-details";
import { selectedIngredient, selectedIngredientReducer } from './ingredient-details';
import { DATA_SelectedIngredientWithItem, DATA_IngredientItem } from '../../service/data';

describe('Детали ингридиента', () => {
    it('Проверяем начальное состояние', () => {
        expect(
            selectedIngredientReducer(undefined, {})
        ).toEqual(selectedIngredient)
    })
    it('Устанавливаем выбранный ингредиент', () => {

        expect(
            selectedIngredientReducer(selectedIngredient, {
                type: actions.SET_SELECTED_INGREDIENT,
                ingredient: DATA_IngredientItem
            })
        ).toEqual({
            ...selectedIngredient,
            ingredient: DATA_IngredientItem
        })
    })
    it('Очищаем выбранный ингредиент', () => {
        expect(
            selectedIngredientReducer(DATA_SelectedIngredientWithItem, {
                type: actions.CLEAR_SELECTED_INGREDIENT
            })
        ).toEqual(selectedIngredient)
    })
})