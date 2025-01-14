import { useEffect } from "react";
import style from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

import IngredientDetails from "../ingredient-details/ingredient-details";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
    Login,
    RegistrationForm,
    ForgotPass,
    ResetPassword,
    Page404,
} from "../../pages";

import Profile from "../profile/profile";
import ProtectedRouteElement from "../protected-route-element/protected-route-element";

import {
    LOGIN_USER,
    SET_TOKEN,
    refreshToken,
} from "../../services/actions/auth";

import {
    CLEAR_SELECTED_INGREDIENT,
    SET_SELECTED_INGREDIENT,
} from "../../services/actions/ingredient-details";

function App() {
    const { closeModal } = useModal(false);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isUserDetected = useAppSelector((state) => state.auth.success);
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );

    const location = useLocation();
    const background = location.state && location.state.background;

    let ingredientID = location.state?.id ? location.state.id : "";
    if (ingredientID === "" && location.pathname.match("/ingredients/:")) {
        ingredientID = location.pathname.replace(/^\/ingredients\/:/, "");
    }

    if (ingredients.length > 0 && ingredientID) {
        const ingredient = ingredients.find((el) => el._id === ingredientID);
        if (ingredient) {
            dispatch({
                type: SET_SELECTED_INGREDIENT,
                ingredient: ingredient,
            });
        } else {
            navigate("/");
        }
    }

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients]);

    useEffect(() => {
        if (!isUserDetected && localStorage.userData) {
            dispatch({
                type: LOGIN_USER,
                payload: {
                    user: JSON.parse(localStorage.userData),
                    success: true,
                },
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

    const closeModalHandler = () => {
        dispatch({
            type: CLEAR_SELECTED_INGREDIENT,
        });
        navigate("/");
        closeModal();
    };

    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <Routes location={background || location}>
                    <Route
                        path="/login"
                        element={
                            <ProtectedRouteElement
                                anonymOnlyEntrance={true}
                                element={<Login />}
                            />
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            <ProtectedRouteElement
                                anonymOnlyEntrance={true}
                                element={<RegistrationForm />}
                            />
                        }
                    />

                    <Route
                        path="/forgot-password"
                        element={
                            <ProtectedRouteElement
                                anonymOnlyEntrance={true}
                                element={<ForgotPass />}
                            />
                        }
                    />

                    <Route
                        path="/reset-password"
                        element={
                            <ProtectedRouteElement
                                anonymOnlyEntrance={true}
                                element={<ResetPassword />}
                            />
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <ProtectedRouteElement element={<Profile />} />
                        }
                    />

                    <Route
                        path="ingredients/:id"
                        element={
                            <Modal
                                onClose={closeModalHandler}
                                title="Детали ингредиента"
                                data-test="ss"
                            >
                                <IngredientDetails />
                            </Modal>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <DndProvider backend={HTML5Backend}>
                                <BurgerIngredients ingredients={ingredients} />
                                <BurgerConstructor />
                            </DndProvider>
                        }
                    ></Route>

                    <Route path="*" element={<Page404 />} />
                </Routes>

                {background && (
                    <Routes>
                        <Route
                            path="/ingredients/:id"
                            element={
                                <Modal
                                    onClose={closeModalHandler}
                                    title="Детали ингредиента"
                                    data-test="ss"
                                >
                                    <IngredientDetails />
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </main>
        </div>
    );
}

export default App;
