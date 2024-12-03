import {IngredientsAction, IngredientsState} from '../../utils/types';

import { useEffect, useState } from 'react';
import style from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// import {data} from '../../utils/data';

// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../utils/store';

import {getIngredients, INCREASE_INGREDIENT_ITEM} from '../../services/actions/burger-ingredients';

import { ADD_INGREDIENT, ADD_BUN } from '../../services/actions/burger-constructor'

import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(){

    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector( (state) => state.ingredients);
    const {topping} = useAppSelector( state=>state.burger)

    // const constructorItems = useAppSelector(state=>state.burger.ingredients)

    // console.dir(constructorItems);
    useEffect(()=>{

        if(!ingredients.length) {
            dispatch(getIngredients());
        }

    }, [dispatch])

    interface DropObj {
        _id?: string | number | undefined
    }


    const dropHandler = (item:DropObj)=>{
        // логика обновления стора
        // console.dir('dropped');
        // console.dir(item._id);

        // const {_id} = item;
        const ingredient = ingredients.find(el=>el._id===item._id);

        dispatch({
            type: ingredient?.type === 'bun' ? ADD_BUN : ADD_INGREDIENT,
            ingredient: ingredient
        })
        dispatch({
            type: INCREASE_INGREDIENT_ITEM,
            ingredient: ingredient
        })


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