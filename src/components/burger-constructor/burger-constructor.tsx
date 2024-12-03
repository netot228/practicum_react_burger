import {useState} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';

import OrderDetails from '../order-details/order-details';

import style from './burger-constructor.module.css';

import {IngredientData} from '../../utils/types';

import { useDrop } from "react-dnd";

import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

interface DropObj {
    _id?: string | number | undefined
}

interface BurgerConstructorProps {
    ingredients: IngredientData[],
    currentBun?: IngredientData,
    dropHandler: (item:DropObj)=> void
}

interface BunProps {
    type?: "bottom" | "top" | undefined,
    bun?: IngredientData | null,
    dropHandler: (item:DropObj)=> void
}

const Bun: React.FC<BunProps> = (props: BunProps) => {

    const {
        name,
        price,
        image
    } = props.bun ? props.bun : {
        name: 'Выберите булочку',
        price: 0,
        image: ''
    };

    // const { name = 'Выберите булочку',
    //         price = 0,
    //         image = ''
    //         } = props.bun;



    const type = props.bun === undefined ? undefined : props.type;
    const dropHandler = props.dropHandler;
    const [{isHover}, dropTarget] = useDrop({
        accept: "bun",
        drop(item:DropObj) {
            dropHandler(item);
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
                        ${props.bun === null && style.undefinedBun}
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

    const {topping, bun} = useAppSelector(state=>state.burger);

    console.log('ingredients')
    console.dir(topping);

    const dispatch = useAppDispatch();

    const {dropHandler} = props;

    const ingredientsList = topping.length > 0
                            ?
                            topping.map((el)=>{


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
                            : [];

    const total = topping.length > 0 && bun
                                    ? (topping as IngredientData[]).reduce((total, el)=>total+el.price, 0)
                                        + bun.price
                                    : 0;

    const {isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = ()=>{
        if(isModalOpen){
            closeModal();
        } else {
            openModal();
        }
    }

    const bunProps:BunProps = {
        bun: bun,
        dropHandler: dropHandler
    }


    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item:DropObj) {
            dropHandler(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const containerExtraClass = `${style.container} ${topping.length<5 && style.hFree }`;

    return(

        <section ref={dropTarget} className={`${style.wrapper}  ${isHover && style.canAccepted } `}>

            <Bun {...bunProps} type="top" />

            <ul className={containerExtraClass}>
                {topping.length>0

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

            {topping.length>0 && bun &&
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