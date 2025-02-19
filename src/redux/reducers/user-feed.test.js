import * as actions from '../actions/user-feed';

import { wsUserFeedState, userFeedReducer } from "./user-feed";
import { DATA_ws_mess } from '../../service/data';


describe('Проверка выбранного заказа', () => {

    it('Проверяем начальное состояние заказа', () => {
        expect(
            userFeedReducer(undefined, {})
        ).toEqual(wsUserFeedState)
    })
    it('Подключение к сокету', () => {
        expect(userFeedReducer(wsUserFeedState, {
            type: actions.WS_USER_FEED_CONNECT
        })).toEqual({
            ...wsUserFeedState,
            error: false,
            success: true,
        })
    })
    it('Отключение от сокета', () => {
        expect(userFeedReducer(wsUserFeedState, {
            type: actions.WS_USER_FEED_CLOSE
        })).toEqual({
            ...wsUserFeedState
        })
    })
    it('Ошибка при подключении', () => {
        expect(userFeedReducer(wsUserFeedState, {
            type: actions.WS_USER_FEED_ERROR
        })).toEqual({
            ...wsUserFeedState,
            error: true,
        })
    })

    it('Получение сообщения', () => {
        expect(userFeedReducer(wsUserFeedState, {
            type: actions.WS_USER_FEED_GET_MESSAGE,
            payload: DATA_ws_mess
        })).toEqual({
            ...wsUserFeedState,
            ...DATA_ws_mess
        })
    })
})
