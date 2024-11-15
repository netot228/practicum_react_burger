import React, { useState } from 'react';

import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';

// import PropTypes from 'prop-types';


// type BurgerProps = {
//     ingredients: object[]
// }
// type IngredientData = {
//     // type?: string,
//     // name: any,
//     // image: any,
//     // price: any,
//     // quantity?: number

//     image: string,
// }

const Ingredient = (ingredient) => {
    return(
        <figure className={style.ingredient}>
            <img src={ingredient.image} alt={ingredient.name} />
            <p className={`${style.ingredient_price} text_type_digits-default`}>
                {ingredient.price}
                <CurrencyIcon className={style.ingredient_icon} type="primary" />
            </p>
            <figcaption className={`${style.ingredient_name} text_type_main-default`}>
                {ingredient.name}
            </figcaption>
            {ingredient.qnt &&  <Counter count={ingredient.qnt} size="default" extraClass="m-1" />}
        </figure>
    )
}

const TabContent = (props) => {
    let children = props.ingredients.map(el=>{
        if(el.type === props.value) {
            return <Ingredient key={el._id} name={el.name} price={el.price} image={el.image} qnt={el.qnt}/>
        }
        return false;
    })
    return (
        <ul className={style.tabcontent}>
            <li className={`text_type_main-medium ${style.tabcontent_title}`}>
                {props.title}
            </li>
            {children}
        </ul>
    )
}

function BurgerIngredients(props){

    let [currentType, setCurrentType] = useState('bun');

    return(
        <section className={style.wrapper}>
            <div className={`text text_type_main-large ${style.title}`}>Соберите бургер</div>
            <div className={style.switcher}>
                <Tab value="bun" active={currentType === 'bun'} onClick={setCurrentType}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentType === 'sauce'} onClick={setCurrentType}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentType === 'main'} onClick={setCurrentType}>
                    Начинки
                </Tab>
            </div>

            <div className={`${style.container} `}>

                <TabContent value="bun" title="Булки" ingredients={props.ingredients}></TabContent>
                <TabContent value="sauce" title="Соусы" ingredients={props.ingredients}></TabContent>
                <TabContent value="main" title="Начинки" ingredients={props.ingredients}></TabContent>

            </div>
        </section>
    )
}

export default BurgerIngredients;