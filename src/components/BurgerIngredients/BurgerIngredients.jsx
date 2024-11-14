import React, { useState } from 'react';

import { Counter, CurrencyIcon, Tab, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerIngredients.module.css';

import PropTypes from 'prop-types';


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
            <p className={style.ingredient_price}>
                {ingredient.price}
                <CurrencyIcon className={style.ingredient_icon} type="primary" />
            </p>
            <figcaption className={style.ingredient_name}>
                {ingredient.name}
            </figcaption>
        </figure>
    )
}

const TabContent = (props) => {
    return (
        <ul className={style.tabcontent}>
            {props.children}
        </ul>
    )
}

function BurgerIngredients(props){

    let [currentType, setCurrentType] = useState('bun');


    let bunList = props.ingredients.map(el=>{
        if(el.type === 'bun') {
            return <Ingredient key={el._id} name={el.name} price={el.price} image={el.image} />
        }
        return false;
    })

    let sauceList = props.ingredients.map(el=>{
        if(el.type === 'sauce') {
            return <Ingredient key={el._id} name={el.name} price={el.price} image={el.image} />
        }
        return false;
    })

    let mainList = props.ingredients.map(el=>{
        if(el.type === 'main') {
            return <Ingredient key={el._id} name={el.name} price={el.price} image={el.image} />
        }
        return false;
    })

    return(
        <section className={style.wrapper}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            <div className={`${style.switcher} mb-10`}>
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

            <div className={`${style.container} custom-scroll`}>

                <TabContent value="bun" title="Булки">
                    {bunList}
                </TabContent>

                <TabContent value="sauce" title="Соусы">
                    {sauceList}
                </TabContent>

                <TabContent value="main" title="Начинки">
                    {mainList}
                </TabContent>

            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {

}

export default BurgerIngredients;