import { DATA_IngredientItem, DATA_IngredientItem2, DATA_BurgerBun, DATA_burgerStateWithToppingAndBun } from '../../service/data';

import * as actions from '../actions/burger-constructor';
import { constructorState, constructorReducer } from './burger-constructor';


describe('проверка конструктора', () => {

    it('Проверяем начальное состояние ингредиентов', () => {
        expect(
            constructorReducer(undefined, {})
        ).toEqual(constructorState)
    })

    it('Добавим булочку', () => {
        expect(
            constructorReducer(constructorState, {
                type: actions.ADD_BUN,
                ingredient: DATA_BurgerBun
            })
        ).toEqual({
            ...constructorState,
            bun: DATA_BurgerBun
        })
    })

    it('Добавим топпинг', () => {
        expect(
            constructorReducer(constructorState, {
                type: actions.ADD_INGREDIENT,
                ingredient: DATA_IngredientItem,
                uid: DATA_IngredientItem.uid
            })
        ).toEqual({
            ...constructorState,
            topping: [...constructorState.topping, { ...DATA_IngredientItem }]
        })
    })

    it('Удалим топпинг', () => {
        expect(
            constructorReducer(DATA_burgerStateWithToppingAndBun, {
                type: actions.REMOVE_INGREDIENT,
                uid: DATA_IngredientItem.uid
            })
        ).toEqual({
            ...DATA_burgerStateWithToppingAndBun,
            topping: [...DATA_burgerStateWithToppingAndBun.topping].filter(el => el.uid !== DATA_IngredientItem.uid)
        })
    })

    it('Очистим бургер', () => {
        expect(
            constructorReducer(DATA_burgerStateWithToppingAndBun, {
                type: actions.CLEAR_BURGER,
            })
        ).toEqual({
            ...constructorState
        })
    })

    it('Поменяем топинги 1й и 2й местами', () => {
        expect(
            constructorReducer(DATA_burgerStateWithToppingAndBun, {
                type: actions.SORT_TOPPING,
                moveItemFromPos: 0,
                moveItemToPos: 1
            })
        ).toEqual({
            ...DATA_burgerStateWithToppingAndBun,
            topping: [DATA_IngredientItem2, DATA_IngredientItem]
        })
    })
})