import React, { ReactElement, useRef, useState } from 'react';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';

import {IngredientData} from '../../utils/types';


// interface BurgerProps {
//     ingredients: IngredientData[]
// }

// interface TabContentData {
//     ingredients: IngredientData[]
//     value: string
//     title: string
//     // ref: any
// }

// interface IngredientProps {
//     data: IngredientData
//     key?: string|number
// }

const Ingredient = (props/*:IngredientProps*/) => {
    return(
        <figure className={style.ingredient}>
            <img src={props.data.image} alt={props.data.name} />
            <p className={`${style.ingredient_price} text_type_digits-default`}>
                {props.data.price}
                <CurrencyIcon className={style.ingredient_icon} type="primary" />
            </p>
            <figcaption className={`${style.ingredient_name} text_type_main-default`}>
                {props.data.name}
            </figcaption>
            {props.data.qnt &&  <Counter count={props.data.qnt} size="default" extraClass="m-1" />}
        </figure>
    )
}

const TabContent = React.forwardRef((props, ref) => {

    let children = props.ingredients.map(el=>{
        if(el.type === props.value) {
            return <Ingredient key={el._id} data={el}/>
        }
        return false;
    })

    return (
        <ul  className={style.tabcontent}>
            <li ref={ref} className={`text_type_main-medium ${style.tabcontent_title}`}>
                {props.title}
            </li>
            {children}
        </ul>
    )
})

function BurgerIngredients(props){

    let [currentType, setCurrentType] = useState('bun');

    let tabConntentRefCollection = {
        bun: useRef(),
        sauce: useRef(),
        main: useRef()
    }

    let tabHandle = (e) => {
        setCurrentType(e)
        // let a;
        // switch(e){
        //     case 'bun':
        //         a = tabConntentRefCollection.bun;
        //         break;
        //     case 'sauce':
        //         a = tabConntentRefCollection.sauce;
        //         break;
        //     case 'main':
        //         a = tabConntentRefCollection.main;
        //         break;
        //     default:
        //         return null

        // }
        // console.dir(a);

        // a.scrollIntoView({ block: "start", behavior: "smooth" });
        console.dir(tabConntentRefCollection[e])
        tabConntentRefCollection[e].current.scrollIntoView({ block: "start", behavior: "smooth" })
    }

    return(
        <section className={style.wrapper}>
            <div className={`text text_type_main-large ${style.title}`}>Соберите бургер</div>
            <div className={style.switcher}>
                <Tab value="bun" active={currentType === 'bun'} onClick={tabHandle}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentType === 'sauce'} onClick={tabHandle}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentType === 'main'} onClick={tabHandle}>
                    Начинки
                </Tab>
            </div>

            <div className={`${style.container}`}>

                <TabContent ref={tabConntentRefCollection.bun}  value="bun" title="Булки" ingredients={props.ingredients}></TabContent>
                <TabContent ref={tabConntentRefCollection.sauce}  value="sauce" title="Соусы" ingredients={props.ingredients}></TabContent>
                <TabContent ref={tabConntentRefCollection.main}  value="main" title="Начинки" ingredients={props.ingredients}></TabContent>

            </div>
        </section>
    )
}

export default BurgerIngredients;