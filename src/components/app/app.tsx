import { useEffect } from "react";
import style from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import {
    Login,
    RegistrationForm,
    ForgotPass,
    ResetPassword,
} from "../../pages";

import Profile from "../profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

import {
    LOGIN_USER,
    SET_TOKEN,
    refreshToken,
    getUserData,
} from "../../services/actions/auth";
import { access } from "fs";

function App() {
    console.log("reload App");

    const dispatch = useAppDispatch();

    const isUserDetected = useAppSelector((state) => state.auth.success);
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (!isUserDetected && localStorage.userData) {
            const userData = { ...JSON.parse(localStorage.userData) };

            dispatch({
                type: LOGIN_USER,
                payload: { user: userData, success: true },
            });

            const timeOut = new Date().getTime() - 5 * 60 * 1000;

            if (
                localStorage.tokenTimeout &&
                Number(localStorage.tokenTimeout) < timeOut
            ) {
                console.log("token просрочен рефреш");

                dispatch(refreshToken(localStorage.refreshToken)).then(
                    (res) => {
                        if (res.success) {
                            console.log("refreshToken DONE");
                        } else {
                            console.log("refreshToken ERROR");
                        }
                        console.dir(res);
                    }
                );
            } else {
                console.log("установка токена");
                dispatch({
                    type: SET_TOKEN,
                    payload: {
                        accessToken: localStorage.accessToken,
                        refreshToken: localStorage.refreshToken,
                    },
                });
            }
        }
    }, [dispatch, isUserDetected]);

    return (
        <BrowserRouter>
            <div className={style.app}>
                <AppHeader />
                <main className={style.mainarea}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            path="/register"
                            element={<RegistrationForm />}
                        />
                        <Route
                            path="/forgot-password"
                            element={<ForgotPass />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRouteElement element={<Profile />} />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <DndProvider backend={HTML5Backend}>
                                    <BurgerIngredients
                                        ingredients={ingredients}
                                    />
                                    <BurgerConstructor />
                                </DndProvider>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
