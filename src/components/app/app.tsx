import { useEffect } from "react";
import style from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../redux/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

import IngredientDetails from "../ingredient-details/ingredient-details";
import FeedDetails from "../feed/feed-details/feed-details";

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

import Feed from "../feed/feed";

import {
    LOGIN_USER,
    refreshToken,
    getUserData,
} from "../../redux/actions/auth";

import {
    CLEAR_SELECTED_INGREDIENT,
    SET_SELECTED_INGREDIENT,
} from "../../redux/actions/ingredient-details";

import { CLEAR_SELECTED_ORDER } from "../../redux/actions/selected-order";

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

    useEffect(() => {
        let ingredientID = location.state?.id ? location.state.id : "";
        if (ingredientID === "" && location.pathname.match("/ingredients/:")) {
            ingredientID = location.pathname.replace(/^\/ingredients\/:/, "");
        }
        if (ingredients.length > 0 && ingredientID) {
            const ingredient = ingredients.find(
                (el) => el._id === ingredientID
            );
            if (ingredient) {
                dispatch({
                    type: SET_SELECTED_INGREDIENT,
                    ingredient: ingredient,
                });
            } else {
                navigate("/");
            }
        }
    }, [location, ingredients, dispatch, navigate]);

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

            if (
                localStorage.userData &&
                localStorage.tokenTimeout &&
                localStorage.refreshToken
            ) {
                const timeOut = new Date().getTime() - 15 * 60 * 1000;

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
                    console.log("APP пользователь");

                    dispatch(getUserData(localStorage.accessToken)).then(
                        (res) => {
                            if (res.message === "jwt expired") {
                                console.dir("jwt expired");
                                console.dir(res);
                                dispatch(
                                    refreshToken(localStorage.refreshToken)
                                );
                            } else if (res.success) {
                                // console.dir("getUserData SUCCESS");
                                // console.dir(res);
                            }
                        }
                    );
                }
            }
        }
    }, [dispatch, isUserDetected]);

    const closeModalHandler = () => {
        dispatch({
            type: CLEAR_SELECTED_INGREDIENT,
        });
        dispatch({
            type: CLEAR_SELECTED_ORDER,
        });

        if (background?.pathname) {
            navigate(background.pathname);
        } else {
            navigate("/");
        }
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
                        path="/profile/*"
                        element={
                            <ProtectedRouteElement element={<Profile />} />
                        }
                    />

                    <Route
                        path="/ingredients/:id"
                        element={<IngredientDetails />}
                    />

                    <Route path="/feed/:id" element={<FeedDetails />} />
                    <Route path="/feed" element={<Feed />} />

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

                        <Route
                            path="/feed/:id"
                            element={
                                <Modal onClose={closeModalHandler} title="">
                                    <FeedDetails />
                                </Modal>
                            }
                        />

                        <Route
                            path="/profile/orders/:id"
                            element={
                                <Modal onClose={closeModalHandler} title="">
                                    <FeedDetails />
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
