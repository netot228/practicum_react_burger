import {useState} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';

import OrderDetails from '../order-details/order-details';

import style from './burger-constructor.module.css';
import {IngredientData} from '../../utils/types';

interface BurgerConstructorProps {
    ingredients: IngredientData[]
}

function BurgerConstructor(props:BurgerConstructorProps){

    const currentBun: IngredientData | undefined = props.ingredients.find(el=>el.type==='bun');

    const ingredientsList = props.ingredients.map(el=>{
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

    const total = props.ingredients.reduce((total, el)=>total+el.price, 0);

    const {isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = ()=>{
        if(isModalOpen){
            closeModal();
        } else {
            openModal();
        }
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

                    {isModalOpen &&

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