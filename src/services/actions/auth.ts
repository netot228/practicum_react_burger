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
import { stringify } from 'querystring';

export const REGISTER_USER              = 'REGISTER_USER';
export const REGISTER_USER_REQUEST      = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS      = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED       = 'REGISTER_USER_FAILED';

export const LOGIN_USER     = 'LOGIN_USER';
export const LOGOUT_USER    = 'LOGOUT_USER';

export const RESET_TOKEN = 'RESET_TOKEN';

export const RESET_PASSWORD = 'RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';


export const registerRequest = (data:UserData) => (dispatch:AppDispatch) => {

    fetch(AUTH_REGISTER_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        if(response.ok){
            return response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    })
    .then(json=>{

        console.dir(json);
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: json
        });
    })
    .catch(error=>{
        console.log('При отправке данных на регистрацию произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
    })

}

export const sendMailToResetPassword = (email:string) => (dispatch:AppDispatch) => {
    fetch(AUTH_FORGOT_PASSWORD_ENDPOINT, {
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
    })
    .catch(error=>{
        console.log('При запросе на сброс пароля произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
    })
}

export const resetPassword = (data:ResetPassData) => (dispatch:AppDispatch) => {


    // fetch('https://norma.nomoreparties.space/api/password-reset/reset', { //404
    fetch(AUTH_RESET_PASSWORD_ENDPOINT, {
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
    })
    .catch(error=>{
        console.log('При сбросе пароля произошла ошибка')
        console.error(error);
        dispatch({
            type: REGISTER_USER_FAILED
        });
    })

}

export const authUser = (data:UserData) => async (dispatch: AppDispatch) => {

    dispatch({
        type: REGISTER_USER_REQUEST
    });

    return await fetch(AUTH_LOGIN_ENDPOINT,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    })
    .then(response=>{
        if(response.ok || response.status===401){
            return response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
            // throw new Error(`${response.status}`);
        }
    })
    .then(json=>{
        console.dir(json);
        if(!json.success){
            throw new Error(json.message);
        } else {

            localStorage.setItem('refreshToken', json.refreshToken);
            localStorage.setItem('accessToken', json.accessToken.replace(/^Bearer\s+/, ''));

            localStorage.userData = JSON.stringify(json);

            dispatch({
                type: LOGIN_USER,
                payload: json
            });
        }

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


// export const getAuthUser = async (token:string) => {
//     return await fetch(AUTH_LOGIN_ENDPOINT, {
//         headers: {
//             'Authorization': `${token}`
//         }
//     })
// }

// export const getAuthUser = (token: string) => async (dispatch: AppDispatch) => {
//     return await fetch(GET_AUTH_USER, {
//         headers: {
//             'Authorization': `${token}`
//         }
//     })
//     .then(response=>{
//         console.log('response');
//         console.dir(response)

//         if(response.ok || response.status===401){
//             return response.json();
//         } else {
//             throw new Error(`Error: ${response.status}`);
//         }
//     })
//     .then(json=>{
//         console.dir(json);
//         dispatch({
//             type: REGISTER_USER_SUCCESS,
//             payload: json
//         });
//     })
//     .catch(error=>{
//         console.log('Авторизация не пройдена')
//         console.error(error);
//         return error
//         // dispatch({
//         //     type: REGISTER_USER_FAILED
//         // });
//     })
// }

export const resetToken = (token: string) => async (dispatch:AppDispatch) => {

    console.log('reset token');
    console.dir(token);


    return await fetch(AUTH_TOKEN_ENDPOINT,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": token})
    })
    .then(response=>{
        if(response.ok || response.status===401){
            return response.json();
        } else {
            throw new Error(`Error: ${response.status}`);
        }
    })
    .then(json=>{
        console.log('resetTokenThen');

        console.dir(json);
        if(!json.success){
            throw new Error(json.message);
        } else {

            localStorage.setItem('refreshToken', json.refreshToken);
            localStorage.setItem('accessToken', json.accessToken.replace(/^Bearer\s+/, ''));
            localStorage.setItem('tokenTimeout', (new Date().getTime()).toString())

            dispatch({
                type: RESET_TOKEN,
                payload: json
            });
        }

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