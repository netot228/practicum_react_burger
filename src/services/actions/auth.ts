import { AppDispatch } from "../../utils/store";
import { UserData, ResetPassData } from "../../utils/types";
import {
    AUTH_LOGIN_ENDPOINT,
    AUTH_REGISTER_ENDPOINT,
    AUTH_LOGOUT_ENDPOINT,
    AUTH_TOKEN_ENDPOINT,
    AUTH_FORGOT_PASSWORD_ENDPOINT,
    AUTH_RESET_PASSWORD_ENDPOINT,
    GET_AUTH_USER,
} from "../../utils/api-endpoints";

import { requestHandler } from "../../utils/request-api";

export const SEND_REQUEST = "SEND_REQUEST";
export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_FAILED = "REGISTER_USER_FAILED";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_TOKEN = "SET_TOKEN";
export const RESET_PASSWORD = "RESET_PASSWORD";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const GET_USER_DATA = "GET_USER_DATA";

export const regNewUser = (data: UserData) => async (dispatch: AppDispatch) => {
    dispatch({
        type: SEND_REQUEST,
    });

    return await requestHandler(AUTH_REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then((json) => {
            if (json.success) {
                dispatch({
                    type: LOGIN_USER,
                    payload: { ...json, pass: data.password },
                });
            } else {
                throw new Error(json.message);
            }

            return Promise.resolve(json);
        })
        .catch((error) => {
            console.log("При отправке данных на регистрацию произошла ошибка");
            console.error(error);
            dispatch({
                type: REGISTER_USER_FAILED,
            });
            return Promise.reject(
                error.message
                    ? error.message
                    : "При отправке данных на регистрацию произошла ошибка"
            );
        });
};

export const authUser = (data: UserData) => async (dispatch: AppDispatch) => {
    dispatch({
        type: SEND_REQUEST,
    });

    return await requestHandler(AUTH_LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(data),
    })
        .then((json) => {
            if (json.success) {
                dispatch({
                    type: LOGIN_USER,
                    payload: { ...json, pass: data.password },
                });
            } else {
                throw new Error(json.message);
            }

            return Promise.resolve(json);
        })
        .catch((error) => {
            console.log("Авторизация не пройдена");
            console.error(error);
            dispatch({
                type: REGISTER_USER_FAILED,
            });
            return Promise.reject(
                error.message ? error.message : "Авторизация не пройдена"
            );
        });
};

export const refreshToken =
    (token: string) => async (dispatch: AppDispatch) => {
        return await requestHandler(AUTH_TOKEN_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token }),
        })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: SET_TOKEN,
                        payload: { ...json },
                    });
                }
                return json;
            })
            .catch((error) => {
                console.log("Обновление токена прошло неудачно");
                console.error(error);
                dispatch({
                    type: REGISTER_USER_FAILED,
                });
                return error;
            });
    };

export const logOut = (token: string) => async (dispatch: AppDispatch) => {
    localStorage.clear();

    dispatch({
        type: LOGOUT_USER,
    });

    requestHandler(AUTH_LOGOUT_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
    }).catch((error) => {
        console.log("При отправке запрос на выход из профиля произошла ошибка");
        console.error(error);
        return error;
    });
};

export const getUserData = (token: string) => async (dispatch: AppDispatch) => {
    return await requestHandler(GET_AUTH_USER, {
        headers: {
            Authorization: token,
        },
    })
        .then((json) => {
            if (json.success) {
                dispatch({
                    type: GET_USER_DATA,
                    payload: { ...json },
                });
            }

            return json;
        })
        .catch((error) => {
            console.log(
                "При обновлении данных пользователя Что-то пошло не так"
            );
            console.error(error);
            return error;
        });
};

export const updateUserData =
    (token: string, data: UserData) => async (dispatch: AppDispatch) => {
        return await requestHandler(GET_AUTH_USER, {
            method: "PATCH",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: GET_USER_DATA,
                        payload: { ...json, pass: data.password },
                    });
                }

                return json;
            })
            .catch((error) => {
                console.log("Что пошло не так");
                console.error(error);
                return error;
            });
    };

export const sendMailToResetPassword =
    (email: string) => async (dispatch: AppDispatch) => {
        return await requestHandler(AUTH_FORGOT_PASSWORD_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ email: email }),
        })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: RESET_PASSWORD,
                    });
                }
                return json;
            })
            .catch((error) => {
                console.log("При запросе на сброс пароля произошла ошибка");
                console.error(error);
                dispatch({
                    type: REGISTER_USER_FAILED,
                });
                return error;
            });
    };

export const resetPassword =
    (data: ResetPassData) => async (dispatch: AppDispatch) => {
        return await requestHandler(AUTH_RESET_PASSWORD_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                password: data.password,
                token: data.token,
            }),
        })
            .then((json) => {
                if (json.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    });
                }
                return json;
            })
            .catch((error) => {
                console.log("При сбросе пароля произошла ошибка");
                console.error(error);
                dispatch({
                    type: REGISTER_USER_FAILED,
                });
                return error;
            });
    };
