import { useEffect } from "react";
import style from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../../pages/sign-in";

function App() {
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
                        <Route path="/login" element={<SignIn />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
