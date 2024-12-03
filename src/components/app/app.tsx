import {DropObj} from '../../utils/types';

import { useEffect } from 'react';
import style from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';


import {getIngredients} from '../../services/actions/burger-ingredients';
import { ADD_INGREDIENT, ADD_BUN } from '../../services/actions/burger-constructor'

import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App(){

    const dispatch = useAppDispatch();
    const {ingredients} = useAppSelector( (state) => state.ingredients);
    const {topping, bun} = useAppSelector( state=>state.burger)

    useEffect(()=>{

        if(!ingredients.length) {
            dispatch(getIngredients());
        }

    }, [dispatch])


    // const dropHandler = (item:DropObj)=>{

    //     const ingredient = ingredients.find(el=>el._id===item._id);
    //     const uid = `${ingredient?._id}__${Math.floor(Math.random()*1000)}`;

    //     if(ingredient?.type === 'bun' && bun && bun!==ingredient){
    //         console.log('decrease bun');
    //         console.dir(bun);

    //         dispatch({
    //             type: DECREASE_INGREDIENT_ITEM,
    //             ingredient: bun
    //         })
    //     }

    //     dispatch({
    //         type: ingredient?.type === 'bun' ? ADD_BUN : ADD_INGREDIENT,
    //         ingredient: ingredient,
    //         uid: uid

    //     })
    //     dispatch({
    //         type: INCREASE_INGREDIENT_ITEM,
    //         ingredient: ingredient
    //     })

    // }

    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients ingredients={ingredients}/>
                    <BurgerConstructor /* dropHandler={dropHandler} ingredients={[]}*//>
                </DndProvider>
            </main>
        </div>
    )
}

export default App;