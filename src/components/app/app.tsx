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
    SignIn,
    RegistrationForm,
    ForgotPass,
    ResetPassword,
} from "../../pages";

import Profile from "../profile/profile";
import ProtectedRouteElement from '../protected-route-element/protected-route-element'

function App() {
    // const isUserDetected = useAppSelector((state) => state.auth.success);

    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );

    useEffect(() => {
        if (!ingredients.length) {
            dispatch(getIngredients());
        }
    }, [dispatch, ingredients]);

    return (
        <BrowserRouter>
            <div className={style.app}>
                <AppHeader />
                <main className={style.mainarea}>
                    <Routes>
                        <Route path="/login" element={<SignIn />} />
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
                        
                        <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
                        {/* <Route path="/profile" element={<Profile />} /> */}
                        {/* <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} */}
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
