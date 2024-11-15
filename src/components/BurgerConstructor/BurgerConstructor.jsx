import React from 'react';

import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.css';


function BurgerConstructor(props){

    let currentBun = props.ingredients.find(el=>el.type==='bun');

    let ingredientsList = props.ingredients.map(el=>{
        if(el.type !== 'bun') {
            return  <li key={el._id} className={style.item}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={el.name}
                            price={el.price}
                            thumbnail={el.image}
                            extraClass={style.bun}
                        />
                    </li>

        }
        return false;
    })

    let total = props.ingredients.reduce((total, el)=>total+el.price, 0);

    return(
        <section className={style.wrapper}>
            <ConstructorElement
                text={currentBun.name}
                price={currentBun.price}
                thumbnail={currentBun.image}
                type="top"
                isLocked={true}
                extraClass={`${style.bun} ${style.topbun}`}
            />
            <ul className={style.container}>
                {ingredientsList}
            </ul>
            <ConstructorElement
                key={2}
                text={currentBun.name}
                price={currentBun.price}
                thumbnail={currentBun.image}
                type="bottom"
                isLocked={true}
                extraClass={`${style.bun} ${style.btmbun}`}
            />

            <div className={style.confirm_order}>
                <span className={`${style.confirm_order_total} text_type_digits-medium`}>{total}</span>
                <CurrencyIcon className={style.confirm_order_icon} type="primary" />
                <Button extraClass={style.confirm_order_btn} htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

export default BurgerConstructor;