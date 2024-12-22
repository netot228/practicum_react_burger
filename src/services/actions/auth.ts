import { AppDispatch } from '../../utils/store';
import { UserData, ResetPassData } from '../../utils/types';
import {
    AUTH_LOGIN_ENDPOINT,
    AUTH_REGISTER_ENDPOINT,
    AUTH_LOGOUT_ENDPOINT,
    AUTH_TOKEN_ENDPOINT,
    AUTH_FORGOT_PASSWORD_ENDPOINT,
    AUTH_RESET_PASSWORD_ENDPOINT,
    GET_AUTH_USER
} from '../../utils/api-endpoints';

export const SEND_REQUEST               = 'SEND_REQUEST';
export const REGISTER_USER_REQUEST      = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS      = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED       = 'REGISTER_USER_FAILED';
export const LOGIN_USER                 = 'LOGIN_USER';
export const LOGOUT_USER                = 'LOGOUT_USER';
export const SET_TOKEN                  = 'SET_TOKEN';
export const RESET_PASSWORD             = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS     = 'RESET_PASSWORD_SUCCESS';
export const GET_USER_DATA              = 'GET_USER_DATA';


export const regNewUser = (data:UserData) => async (dispatch:AppDispatch) => {

    dispatch({
        type: SEND_REQUEST
    })

    return await fetch(AUTH_REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        if(json.success){

            localStorage.userData       = JSON.stringify(json.user);
            localStorage.refreshToken   = json.refreshToken;
            localStorage.accessToken    = json.accessToken;
            localStorage.tokenTimeout   = (new Date().getTime()).toString();
            localStorage.cosmicSecret   = typeof data.password === 'string' && btoa(data.password);

            dispatch({
                type: LOGIN_USER,
                payload: json
            });
        }
        return json;

    })
    .catch(error=>{
        console.log('При отправке данных на регистрацию произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
        return error;
    })

}

export const authUser = (data:UserData) => async (dispatch: AppDispatch) => {

    dispatch({
        type: SEND_REQUEST
    });

    return await fetch(AUTH_LOGIN_ENDPOINT,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        if(json.success){

            localStorage.userData       = JSON.stringify(json.user);
            localStorage.refreshToken   = json.refreshToken;
            localStorage.accessToken    = json.accessToken;
            localStorage.tokenTimeout   = (new Date().getTime()).toString();
            localStorage.cosmicSecret   = typeof data.password === 'string' && btoa(data.password);

            dispatch({
                type: LOGIN_USER,
                payload: json
            });

        }

        return json

    })
    .catch(error=>{
        console.log('Авторизация не пройдена')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });

        return error
    })
}

export const logOut = (token: string) => async (dispatch:AppDispatch) => {

    localStorage.clear();

    dispatch({
        type: LOGOUT_USER
    });

    return await fetch(AUTH_LOGOUT_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": token})
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        return json

    })
    .catch(error=>{
        console.log('Что пошло не так')
        console.error(error);
        return error
    })
}

export const refreshToken = (token: string) => async (dispatch:AppDispatch) => {

    return await fetch(AUTH_TOKEN_ENDPOINT,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": token})
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        if(json.success){

            localStorage.refreshToken   = json.refreshToken;
            localStorage.tokenTimeout   = (new Date().getTime()).toString();
            localStorage.accessToken    = json.accessToken;

            dispatch({
                type: SET_TOKEN,
                payload: json
            });
        }

        return json;

    })
    .catch(error=>{
        console.log('Авторизация не пройдена')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });

        return error
    })
}

export const getUserData = (token: string) => async (dispatch:AppDispatch) => {

    return await fetch(GET_AUTH_USER, {
        headers: {
            Authorization: token
        }
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        console.log('getUserData')
        console.dir(json);
        if(json.success){

            localStorage.userData       = JSON.stringify(json.user);

            dispatch({
                type: GET_USER_DATA,
                payload: json
            });
        }
        return json
    })
    .catch(error=>{
        console.log('Что пошло не так')
        console.error(error);
        return error
    })
}

export const updateUserData = (token: string,  data:UserData) => async (dispatch: AppDispatch) => {

    localStorage.cosmicSecret   = typeof data.password === 'string' && btoa(data.password);

    return await fetch(GET_AUTH_USER, {
        method: 'PATCH',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        return response.json();
    })
    .then(json=>{

        console.log('updateUserData')
        console.dir(json);

        if(json.success){

            localStorage.userData       = JSON.stringify(json.user);

            dispatch({
                type: GET_USER_DATA,
                payload: json
            });
        }

        return json
    })
    .catch(error=>{
        console.log('Что пошло не так')
        console.error(error);
        return error
    })

}

export const sendMailToResetPassword = (email:string) => async (dispatch:AppDispatch) => {
    return await fetch(AUTH_FORGOT_PASSWORD_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({"email": email})
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    })
    .then(json=>{
        console.dir(json)
        dispatch({
            type: RESET_PASSWORD
        });
        return json;
    })
    .catch(error=>{
        console.log('При запросе на сброс пароля произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
        return error;
    })
}

export const resetPassword = (data:ResetPassData) => async (dispatch:AppDispatch) => {

    // fetch('https://norma.nomoreparties.space/api/password-reset/reset', { //404
    return await fetch(AUTH_RESET_PASSWORD_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "password": data.password,
            "token": data.token
        })
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    })
    .then(json=>{
        console.dir(json)
        dispatch({
            type: RESET_PASSWORD_SUCCESS
        });
        return json;
    })
    .catch(error=>{
        console.log('При сбросе пароля произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
        return error;
    })

}