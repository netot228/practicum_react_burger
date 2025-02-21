import * as actions from '../actions/selected-order';

import { selectedOrder, selectedOrderReducer } from "./selected-order";
import { DATA_orders_done } from '../../service/data';


describe('Проверка выбранного заказа', () => {

    it('Проверяем начальное состояние заказа', () => {
        expect(
            selectedOrderReducer(undefined, {})
        ).toEqual(selectedOrder)
    })
    it('Очистить выбранный заказ', () => {
        expect(
            selectedOrderReducer({
                order: DATA_orders_done
            }, { type: actions.CLEAR_SELECTED_ORDER })
        ).toEqual(selectedOrder)
    })
    it('Установить заказ', () => {
        expect(
            selectedOrderReducer(selectedOrder, { type: actions.SET_SELECTED_ORDER, order: DATA_orders_done })
        ).toEqual({
            ...selectedOrder,
            order: DATA_orders_done
        })
    })
})
