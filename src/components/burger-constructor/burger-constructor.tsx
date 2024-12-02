import {useState} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';

import OrderDetails from '../order-details/order-details';

import style from './burger-constructor.module.css';

import {IngredientData} from '../../utils/types';

import { useDrop } from "react-dnd";

import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { ADD_INGREDIENT } from '../../services/actions/burger-constructor'

interface BurgerConstructorProps {
    ingredients: IngredientData[],
    currentBun?: IngredientData,
    dropHandler: (_id:string|number|undefined)=> void
}

interface BunProps {
    type?: "bottom" | "top" | undefined,
    bun?: IngredientData,
    dropHandler: (_id:string|number|undefined)=> void
}

const Bun: React.FC<BunProps> = (props: BunProps) => {



    const {
        name,
        price,
        image
    } = props.bun || {
        name: 'Выберите булочку',
        price: 0,
        image: ''
    };

    const type = props.bun === undefined ? undefined : props.type;

    const dropHandler = props.dropHandler;

    const [{isHover}, dropTarget] = useDrop({
        accept: "bun",
        drop(_id:string|number|undefined) {
            dropHandler(_id);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const extraClass = `${style.bun}
                        ${props.type === 'top'
                            ? style.topbun
                            : style.btmbun
                        }
                        ${props.bun === undefined && style.undefinedBun}
                        ${isHover && style.canAccepted}
                        `;

    return (
        <div ref={dropTarget}>
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                type={type}
                isLocked={true}
                extraClass={extraClass}
            />
        </div>
    )
}

function BurgerConstructor(props:BurgerConstructorProps){

    const ingredients = useAppSelector(state=>state.constructor.ingredients)
    const dispatch = useAppDispatch();

    const {currentBun, dropHandler} = props;

    const ingredientsList = ingredients.map(el=>{
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

    const total = ingredients.length> 0 ? ingredients.reduce((total:number, el:IngredientData)=>total+el.price, 0) : 0;

    const {isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = ()=>{
        if(isModalOpen){
            closeModal();
        } else {
            openModal();
        }
    }

    const bunProps:BunProps = {
        bun: currentBun,
        dropHandler: dropHandler
    }
    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(_id) {
            // dropHandler(_id);
            dispatch({
                type: ADD_INGREDIENT,
                _id
            });
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return(

        <section className={style.wrapper}>

            <Bun {...bunProps} type="top" />

            <ul className={`${style.container} ${props.ingredients.length<5 && style.hFree } `}>
                {props.ingredients.length>0

                    ?   ingredientsList

                    :
                        <li className={style.item}>
                            <DragIcon className={`${style.drug_btn} ${style.undefinedBun}`} type="primary" />
                            <ConstructorElement
                                text='Выберите начинку'
                                price={0}
                                thumbnail=''
                                type={undefined}
                                extraClass={`${style.undefinedBun} ${style.bun}`}
                            />
                        </li>
                    }
                {}
            </ul>

            <Bun {...bunProps} type="bottom" />

            {props.ingredients.length>0 && currentBun &&
                <>
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


            {}
            {/* {props.ingredients.length>0 &&
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
            } */}


        </section>
    )
}

export default BurgerConstructor;