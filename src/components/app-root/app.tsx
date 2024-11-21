import React, { useEffect, useState } from 'react';
import style from './app-root.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// import {data} from '../../utils/data';

const DATA_END_POINT_URL = 'https://norma.nomoreparties.space/api/ingredients';


function App(){

    const [state, setState ] = useState({
        dataLoaded: false,
        data:[]
    });

    useEffect(()=>{

        fetch(DATA_END_POINT_URL)
        .then(response=>{
            if(response.ok){
                return response.json();
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        })
        .then(json=>{
            console.dir(json.data)
            setState({data: json.data, dataLoaded: true});
        })
        .catch(error=>{
            console.log('Что-то пошло не так')
            console.error(error);
        })


    }, [])

    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <BurgerIngredients ingredients={state.data}/>
                <BurgerConstructor ingredients={state.data}/>
            </main>
        </div>
    )
}

export default App;