import { DATA_order_list, DATA_orders_done } from '../../service/data';

import * as actions from '../actions/order-details';
import { orderReducer, orderState } from "./order-details";

describe('проверка создания заказа', () => {

    it('Проверяем начальное состояние заказа', () => {
        expect(
            orderReducer(undefined, {})
        ).toEqual(orderState)
    })

    it('Отправка заказа на сервер', () => {
        expect(
            orderReducer(orderState, {
                type: actions.SEND_ORDER_REQUEST,
                order: DATA_order_list
            })
        ).toEqual({
            ...orderState,
            ingredients: DATA_order_list,
            processing: true
        })
    })

    it('Оформление заказа', () => {
        expect(
            orderReducer(orderState, {
                type: actions.SEND_ORDER_SUCCESS,
                json: DATA_orders_done
            })
        ).toEqual({
            ...orderState,
            orderData: DATA_orders_done,
            success: true,
            processing: false,
        })
    })

    it('При оформлении заказа случилась ошибка', () => {
        expect(
            orderReducer(orderState, { type: actions.SEND_ORDER_FAILED })
        ).toEqual(orderState)
    })

    it('Очистка структуры заказа', () => {
        expect(
            orderReducer(orderState, { type: actions.CLEAR_ORDER_DETAILS })
        ).toEqual(orderState)
    })


})