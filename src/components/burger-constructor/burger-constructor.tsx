import {IngredientData, DropObj} from '../../utils/types';

import {useMemo} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop } from "react-dnd";

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { sendOrder } from '../../services/actions/order-details';
import OrderDetails from '../order-details/order-details';

import {INCREASE_INGREDIENT_ITEM, DECREASE_INGREDIENT_ITEM} from '../../services/actions/burger-ingredients';
import { ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor'

import style from './burger-constructor.module.css';

interface BurgerConstructorProps {
    ingredients?: IngredientData[],
    currentBun?: IngredientData,
    dropHandler?: (item:DropObj)=> void
}

interface BunProps {
    type?: "bottom" | "top" | undefined,
    bun?: IngredientData | null
}

interface ToppingProps {
    topping: IngredientData | null,
    removeTopping?: (uid:string | number | undefined)=>void
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

    const type = props.bun === undefined ? undefined : props.type;
    const extraClass = `${style.bun}
                        ${props.type === 'top'
                            ? style.topbun
                            : style.btmbun
                        }
                        ${props.bun === null && style.undefinedBun}
                        `;
    return (
        <div>
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

const Topping: React.FC<ToppingProps> = (props: ToppingProps) => {

    const {
        name,
        price,
        image,
        uid
    } = props.topping ? props.topping : {
        name: 'Выберите начинку',
        price: 0,
        image: '',
        uid: ''
    };

    const removeTopping = props.removeTopping || null;

    const deleteTopping = ()=>{
        removeTopping && removeTopping(uid)
    }

    return (
        <li className={`${style.item} ${!props.topping && style.undefinedBun}`}>
            <DragIcon className={style.drug_btn} type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass={style.bun}
                handleClose={deleteTopping}
            />
        </li>
    )
}

function BurgerConstructor(props:BurgerConstructorProps){

    const {ingredients}     = useAppSelector(state=>state.ingredients);
    const {topping, bun}    = useAppSelector(state=>state.burger);
    const {orderData}       = useAppSelector(state=>state.order);


    console.log('render burger constructor')
    console.dir(orderData);
    
    const dispatch = useAppDispatch();

    const decreaseItem = (item:IngredientData|undefined)=>{
        dispatch({
            type: DECREASE_INGREDIENT_ITEM,
            ingredient: item
        })
    }
    const removeTopping = (uid: string | number | undefined)=>{
        const removedItem = topping.find(el=>el.uid===uid)
        dispatch({
            type: REMOVE_INGREDIENT,
            uid
        })
        decreaseItem(removedItem)
    }

    const dropHandler = (item:DropObj)=>{

        const ingredient = ingredients.find(el=>el._id===item._id);
        const uid = `${ingredient?._id}__${Math.floor(Math.random()*1000)}`;

        if(ingredient?.type === 'bun' && bun && bun!==ingredient){
            decreaseItem(bun)
        }

        dispatch({
            type: ingredient?.type === 'bun' ? ADD_BUN : ADD_INGREDIENT,
            ingredient: ingredient,
            uid: uid

        })
        dispatch({
            type: INCREASE_INGREDIENT_ITEM,
            ingredient: ingredient
        })

    }

    const ingredientsList = useMemo(
        ()=> {
            const toppingCollect = topping.length > 0
                ?
                topping.map((el, i)=>{

                    if(el.type !== 'bun') {
                        return  <Topping key={`${el._id}_${i}`} removeTopping={removeTopping} topping={el}/>
                    }
                    return false;

                })
                : [];
            return toppingCollect;
        }, [topping]);

    const total = useMemo(()=>{
        return topping.length > 0 && bun
        ? (topping as IngredientData[]).reduce((total, el)=>total+el.price, 0) + bun.price*2
        : 0;
    }, [topping, bun])
    

    const {isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = ()=>{

        if(isModalOpen){
            closeModal();
        } else {
            
            let sendOrderData = topping.map(el=>el._id);
        
            if(bun){
                sendOrderData.push(bun._id)
            }
            
            dispatch(sendOrder(sendOrderData))

            openModal();
        }
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

    const containerExtraClass = `${style.container} ${topping.length<=5 && style.hFree }`;

    return(

        <section ref={dropTarget} className={`${style.wrapper}  ${isHover && style.canAccepted } `}>

            <Bun bun={bun} type="top" />

            <ul className={containerExtraClass}>
                {topping.length > 0 ? ingredientsList : <Topping topping={null}/>}
            </ul>

            <Bun bun={bun} type="bottom" />

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
                            <OrderDetails orderData={orderData}/>
                        </Modal>

                        }
                </>
            }

        </section>
    )
}

export default BurgerConstructor;