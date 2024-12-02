import {IngredientsAction, IngredientsState} from '../../utils/types';

import { useEffect, useState } from 'react';
import style from './app.module.css'

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// import {data} from '../../utils/data';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/store';

import {getIngredients} from '../../services/actions/burger-ingredients'


// const DATA_END_POINT_URL = 'https://norma.nomoreparties.space/api/ingredients';

function App(){

    const dispatch = useDispatch();
    const {ingredients} = useSelector( (state: RootState) => state.ingredients)
      

    // const [state, setState ] = useState({
    //     dataLoaded: false,
    //     data:[]
    // });

    useEffect(()=>{

        if(!ingredients.length) {
            // dispatch(getIngredients());
        }

        // fetch(DATA_END_POINT_URL)
        // .then(response=>{
        //     if(response.ok){
        //         return response.json();
        //     } else {
        //         throw new Error(`Error: ${response.status}`);
        //     }
        // })
        // .then(json=>{
        //     setState({data: json.data, dataLoaded: true});
        // })
        // .catch(error=>{
        //     console.log('Что-то пошло не так')
        //     console.error(error);
        // })


    }, [])

    return (
        <div className={style.app}>
            <AppHeader />
            <main className={style.mainarea}>
                <BurgerIngredients ingredients={ingredients}/>
                <BurgerConstructor ingredients={ingredients}/>
            </main>
        </div>
    )
}

export default App;