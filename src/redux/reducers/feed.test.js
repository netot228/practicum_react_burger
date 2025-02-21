import * as actions from '../actions/feed';
import { wsFeedState, feedReducer } from "./feed";
import { DATA_ws_mess } from '../../service/data';


describe('Проверка ленты заказов', () => {
    it('Проверяем начальное состояние заказа', () => {

        expect(
            feedReducer(undefined, {})
        ).toEqual(wsFeedState)
    })

    it('Подключение к сокету', () => {
        expect(feedReducer(wsFeedState, {
            type: actions.WS_FEED_CONNECT
        })).toEqual({
            ...wsFeedState,
            error: false,
            success: true,
        })
    })
    it('Отключение от сокета', () => {
        expect(feedReducer(wsFeedState, {
            type: actions.WS_FEED_CLOSE
        })).toEqual({
            ...wsFeedState
        })
    })

    it('Ошибка при подключении', () => {
        expect(feedReducer(wsFeedState, {
            type: actions.WS_FEED_ERROR
        })).toEqual({
            ...wsFeedState,
            error: true,
        })
    })

    it('Получение сообщения', () => {
        expect(feedReducer(wsFeedState, {
            type: actions.WS_FEED_GET_MESSAGE,
            payload: DATA_ws_mess
        })).toEqual({
            ...wsFeedState,
            ...DATA_ws_mess
        })
    })


})