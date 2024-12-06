import { useEffect } from "react";
import style from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/burger-ingredients";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients ingredients={ingredients} />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </div>
    );
}

export default App;
