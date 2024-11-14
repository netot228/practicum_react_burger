import React from 'react';
import style from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import {data} from '../../utils/data';

function App(){
    return (
        <div className={style.App}>
            <AppHeader />
            <main className={style.mainarea}>
                <BurgerIngredients ingredients={data}/>
                <BurgerConstructor />
            </main>
        </div>
    )
}

export default App;