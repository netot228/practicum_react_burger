import {IngredientsAction, IngredientsState} from '../../utils/types';

import { useEffect, useState } from 'react';
import style from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// import {data} from '../../utils/data';

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../utils/store';

import {getIngredients} from '../../services/actions/burger-ingredients';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(){

    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector( (state) => state.ingredients)

    useEffect(()=>{

        if(!ingredients.length) {
            dispatch(getIngredients());
        }

    }, [dispatch])

    const dropHandler = (_id:string|number|undefined)=>{
        // логика обновления стора
        console.dir('dropped');
        console.dir(_id);
    }

    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients ingredients={ingredients}/>
                    <BurgerConstructor dropHandler={dropHandler} ingredients={[]}/>
                </DndProvider>
            </main>
        </div>
    )
}

export default App;