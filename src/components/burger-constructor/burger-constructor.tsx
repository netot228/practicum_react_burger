import {useState} from 'react';
import { createPortal } from 'react-dom';

import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-constructor.module.css';

import {IngredientData} from '../../utils/types';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

interface BurgerConstructorProps {
    ingredients: IngredientData[]
}

function BurgerConstructor(props:BurgerConstructorProps){

    let currentBun: IngredientData | undefined = props.ingredients.find(el=>el.type==='bun');

    let ingredientsList = props.ingredients.map(el=>{
        if(el.type !== 'bun') {
            return  <li key={el._id} className={style.item}>
                        <DragIcon className={style.drug_btn} type="primary" />
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

    const [isOrdered, setIsOrdered] = useState(false);
    const confirmOrder = ()=>{
        setIsOrdered(!isOrdered);
    }

    return(

        <section className={style.wrapper}>
            {props.ingredients.length>0 &&
                <>
                    {currentBun !== undefined &&
                        <ConstructorElement
                            text={currentBun.name}
                            price={currentBun.price}
                            thumbnail={currentBun.image}
                            type="top"
                            isLocked={true}
                            extraClass={`${style.bun} ${style.topbun}`}
                        />
                    }
                    <ul className={style.container}>
                        {ingredientsList}
                    </ul>
                    {currentBun !== undefined &&
                        <ConstructorElement
                            key={2}
                            text={currentBun.name}
                            price={currentBun.price}
                            thumbnail={currentBun.image}
                            type="bottom"
                            isLocked={true}
                            extraClass={`${style.bun} ${style.btmbun}`}
                        />
                    }

                    <div className={style.confirm_order}>
                        <span className={`${style.confirm_order_total} text_type_digits-medium`}>{total}</span>
                        <CurrencyIcon className={style.confirm_order_icon} type="primary" />
                        <Button extraClass={style.confirm_order_btn}
                                htmlType="button"
                                type="primary"
                                size="large"
                                onClick={confirmOrder}
                                >
                                Оформить заказ
                        </Button>
                    </div>

                    {isOrdered &&

                        <Modal onClose={confirmOrder} >
                            <OrderDetails />
                        </Modal>

                        }
                </>
            }


        </section>
    )
}

export default BurgerConstructor;