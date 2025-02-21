import * as actions from '../actions/auth';
import { initState, authReducer } from './auth';

import { DATA_setTokenResponse, DATA_LoginUser } from '../../service/data';

describe('Проверка авторизации', () => {
    it('Проверяем начальное состояние', () => {
        expect(
            authReducer(undefined, {})
        ).toEqual(initState)
    })
    it('Отправка запроса на регистрацию', () => {
        expect(
            authReducer(initState, {
                type: actions.SEND_REQUEST
            })
        ).toEqual({
            ...initState,
            requestRegister: true,
        })
    })
    it('Регистрация провалена', () => {
        expect(
            authReducer(initState, {
                type: actions.REGISTER_USER_FAILED
            })
        ).toEqual({
            ...initState
        })
    })
    it('Установка токена', () => {
        expect(
            authReducer(initState, {
                type: actions.SET_TOKEN,
                payload: DATA_setTokenResponse
            })
        ).toEqual({
            ...initState,
            ...DATA_setTokenResponse
        })
    })
    it('Авторизация пользователя', () => {
        expect(
            authReducer(initState, {
                type: actions.LOGIN_USER,
                payload: DATA_LoginUser
            })
        ).toEqual({
            ...initState,
            ...DATA_LoginUser
        })
    })

    it('Выход пользователя', () => {
        expect(
            authReducer(initState, {
                type: actions.LOGOUT_USER
            })
        ).toEqual({
            ...initState
        })
    })
    it('Сброс пароля', () => {
        expect(
            authReducer(initState, {
                type: actions.RESET_PASSWORD
            })
        ).toEqual({
            ...initState
        })
    })
})