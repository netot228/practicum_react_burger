import {IngredientData, DrugItem} from '../../utils/types';

import {useMemo, useRef} from 'react';
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { sendOrder, CLEAR_ORDER_DETAILS } from '../../services/actions/order-details';
import OrderDetails from '../order-details/order-details';

import {INCREASE_INGREDIENT_ITEM, DECREASE_INGREDIENT_ITEM} from '../../services/actions/burger-ingredients';
import { ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT, SORT_TOPPING } from '../../services/actions/burger-constructor'

import style from './burger-constructor.module.css';

interface BunProps {
    type?: "bottom" | "top" | undefined,
    bun?: IngredientData | null
}
interface ToppingProps {
    topping: IngredientData | null,
    index?: number,
    removeTopping?: (uid:string | number | undefined)=>void
}
interface ToppingBlockProps {
    topping: IngredientData[] | [],
    decreaseItem: (item:IngredientData|undefined)=>void
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
    const index = props.index || 0;
    const dispatch = useAppDispatch();

    const deleteTopping = ()=>{
        removeTopping && removeTopping(uid)
    }

    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'topping',
        item: { uid, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        })

    }, []);

    const [, drop] = useDrop(
        {
            accept: 'topping',
            hover(item:DrugItem, monitor) {

                if (!ref.current) {
                    return
                }

                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return
                }

                const hoverItemBox = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverItemBox.bottom - hoverItemBox.top)/2;

                const clientOffset = monitor.getClientOffset(); //{x:number,y:number}
                const hoverY = (clientOffset as any).y - hoverItemBox.top

                if (dragIndex && dragIndex < hoverIndex && hoverY < hoverMiddleY) {
                    return
                }

                if (dragIndex && dragIndex > hoverIndex && hoverY > hoverMiddleY) {
                    return
                }

                dispatch({
                    type: SORT_TOPPING,
                    moveItemToPos: hoverIndex,
                    moveItemFromPos: dragIndex
                })

                item.index = hoverIndex

            }
        }, []
    )

    drag(drop(ref))

    const extraClass = `${style.item} ${!props.topping && style.undefinedBun} ${isDragging && style.is_Dragging}`

    return (
        <li ref={ref} className={extraClass}>
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

const ToppingBlock:  React.FC<ToppingBlockProps> = (props: ToppingBlockProps) => {

    const dispatch = useAppDispatch();

    const {topping, decreaseItem} = props;

    const removeTopping = (uid: string | number | undefined)=>{
        const removedItem = topping.find(el=>el.uid===uid)
        dispatch({
            type: REMOVE_INGREDIENT,
            uid
        })
        decreaseItem(removedItem)
    }

    const ingredientsList = useMemo(
        ()=> {
            const toppingCollect = topping.length > 0

                ? topping.map((el, i)=>{

                    return  <Topping    key={`${el._id}_${i}`}
                                        removeTopping={removeTopping}
                                        topping={el}
                                        index={i}

                                        />

                })

                : [<Topping key={0} topping={null}/>];


            return toppingCollect;
        }, [topping]
    );

    const containerExtraClass = `${style.container} ${topping.length<=5 && style.hFree }`;

    return(
        <ul className={containerExtraClass}>
            {ingredientsList}
        </ul>
    )
}

function BurgerConstructor(){

    const {ingredients}     = useAppSelector(state=>state.ingredients);
    const {topping, bun}    = useAppSelector(state=>state.burger);
    const {success: orderCreated, notice: orderNotice} = useAppSelector(state=>state.order);

    const dispatch = useAppDispatch();

    const decreaseItem = (item:IngredientData|undefined)=>{
        dispatch({
            type: DECREASE_INGREDIENT_ITEM,
            ingredient: item
        })
    }

    const dropHandler = (item:DrugItem)=>{

        const ingredient = ingredients.find(el=>el._id===item._id);
        const uid = `${ingredient?._id}__${Math.floor(Math.random()*10000)}`;

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

    const total = useMemo(()=>{
        return topping.length > 0 && bun
            ? (topping as IngredientData[]).reduce((total, el)=>total+el.price, 0) + bun.price*2
            : 0;
        }, [topping, bun]
    )

    const {isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = ()=>{

        if(isModalOpen){
            closeModal();
            dispatch({type:CLEAR_ORDER_DETAILS})
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
        accept: 'ingredient',
        drop(item:DrugItem) {
            dropHandler(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return(

        <section ref={dropTarget} className={`${style.wrapper}  ${isHover && style.canAccepted } `}>

            <Bun bun={bun} type="top" />

            <ToppingBlock decreaseItem={decreaseItem} topping={topping}/>

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

                    {isModalOpen && (orderCreated || orderNotice) && 

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