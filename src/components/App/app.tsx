import React from 'react';
import style from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {data} from '../../utils/data';

function App(){
    return (
        <div className={style.App}>
            <AppHeader />
            <main className={style.mainarea}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor ingredients={data}/>
            </main>
        </div>
    )
}

export default App;