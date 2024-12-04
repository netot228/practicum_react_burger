import {IngredientData, DrugItem} from '../../utils/types';

import {useMemo, useRef} from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag } from "react-dnd";
// import type { Identifier, XYCoord } from 'dnd-core'

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';
import {useAppDispatch, useAppSelector} from '../../hooks/useAppSelector';

import { sendOrder, CLEAR_ORDER_DETAILS } from '../../services/actions/order-details';
import OrderDetails from '../order-details/order-details';

import {INCREASE_INGREDIENT_ITEM, DECREASE_INGREDIENT_ITEM} from '../../services/actions/burger-ingredients';
import { ADD_INGREDIENT, ADD_BUN, REMOVE_INGREDIENT } from '../../services/actions/burger-constructor'

import style from './burger-constructor.module.css';

interface BurgerConstructorProps {
    ingredients?: IngredientData[],
    currentBun?: IngredientData,
    dropHandler?: (item:DrugItem)=> void
}

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

interface DragTopping {
    index: number
    uid: string
    // type: string
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

    const deleteTopping = ()=>{
        removeTopping && removeTopping(uid)
    }

    /*
        // логика сортировки:
        создаем реф, который присваиваем элементам списка
        данный реф выступает в качестве таскаемого элемента и элемента принимающего таскаемый
    */
    const ref = useRef<HTMLLIElement>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'topping',

        // в информацию об объекте положим кроме uid еще его индекс в массиве
        // это необходимо для перестройки набора топингов и отслеживания его позиции

        item: { uid, index },
        collect: (monitor: any) => ({
            // нужно для отслеживания события, чтобы "подсветить" перетаскиваемый элемент
            isDragging: monitor.isDragging(),
        })

    }, []);



        const [/*{handlerId}*/, drop] = useDrop/*<DrugItem, void,{ handlerId: Identifier | null }>*/(


                {
                    accept: 'topping',

                    // collect: monitor => ({
                    //     handlerId: monitor.getHandlerId()}
                    // ),

                    // в useDrop в качестве Item - хранится таскаемый объект
                    hover(item:DrugItem, monitor) {

                        // ref - место назначения, то есть текущий, принимающий объект
                        if (!ref.current) {
                            return
                        }

                        const dragIndex = item.index;
                        const hoverIndex = index; // индекс текущего, принимающего объекта

                        if (dragIndex === hoverIndex) {
                            return
                        }

                        const hoverItemBox = ref.current?.getBoundingClientRect();
                        const hoverMiddleY = (hoverItemBox.bottom - hoverItemBox.top)/2;

                        // получить координаты мыши
                        // в обычном режиме это данные приходят от события
                        // move (e)=>MouseEvent.clientX/MouseEvent.clientY

                        const clientOffset = monitor.getClientOffset(); //{x:number,y:number}
                        const hoverY = (clientOffset as any).y - hoverItemBox.top

                        if (dragIndex && dragIndex < hoverIndex && hoverY < hoverMiddleY) {
                            // если таскаемый объект выше и мышка выше середины таргета
                            return
                        }

                        if (dragIndex && dragIndex > hoverIndex && hoverY > hoverMiddleY) {
                            // если таскаемый объект ниже и мышка ниже середины таргета
                            return
                        }

                        console.log('ref')
                        console.dir(ref)

                        ref.current.style.right = '200px';


                        // console.dir(monitor.getClientOffset())
                    }
                }
            )

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <li ref={ref} style={{opacity}} className={`${style.item} ${!props.topping && style.undefinedBun}`}>
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
                ?
                topping.map((el, i)=>{

                    if(el.type !== 'bun') {

                        return  <Topping    key={`${el._id}_${i}`}
                                            removeTopping={removeTopping}
                                            topping={el}
                                            index={i}
                                            />
                    }
                    return false;

                })
                : [];
            return toppingCollect;
        }, [topping]
    );

    const containerExtraClass = `${style.container} ${topping.length<=5 && style.hFree }`;

    // const [{isHover}, drop] = useDrop({
    //     accept: 'topping',
    //     drop(item:DrugItem) {
    //         debugger;
    //     },
    //     collect: monitor => ({
    //         isHover: monitor.isOver(),
    //     }),
    //     hover(item: DrugItem, monitor) {
    //         // console.dir(ref.current)
    //     }
    // });

    return(
        <ul className={containerExtraClass}>
            {topping.length > 0 ? ingredientsList : <Topping topping={null}/>}
        </ul>
    )
}

function BurgerConstructor(props:BurgerConstructorProps){

    const {ingredients}     = useAppSelector(state=>state.ingredients);
    const {topping, bun}    = useAppSelector(state=>state.burger);
    const {orderData}       = useAppSelector(state=>state.order);

    const dispatch = useAppDispatch();

    const decreaseItem = (item:IngredientData|undefined)=>{
        dispatch({
            type: DECREASE_INGREDIENT_ITEM,
            ingredient: item
        })
    }
    // const removeTopping = (uid: string | number | undefined)=>{
    //     const removedItem = topping.find(el=>el.uid===uid)
    //     dispatch({
    //         type: REMOVE_INGREDIENT,
    //         uid
    //     })
    //     decreaseItem(removedItem)
    // }

    const dropHandler = (item:DrugItem)=>{

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

    // const ingredientsList = useMemo(
    //     ()=> {
    //         const toppingCollect = topping.length > 0
    //             ?
    //             topping.map((el, i)=>{

    //                 if(el.type !== 'bun') {

    //                     return  <Topping key={`${el._id}_${i}`} removeTopping={removeTopping} topping={el}/>
    //                 }
    //                 return false;

    //             })
    //             : [];
    //         return toppingCollect;
    //     }, [topping]
    // );

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

    // const [, drop] = useDrop({
    //     accept: 'ingredient',
    //     drop(item:DrugItem) {
    //         dropHandler(item);
    //     },
    //     collect: monitor => ({
    //         isHover: monitor.isOver(),
    //     })
    // });



    return(

        <section ref={dropTarget} className={`${style.wrapper}  ${isHover && style.canAccepted } `}>

            <Bun bun={bun} type="top" />

            <ToppingBlock decreaseItem={decreaseItem} topping={topping}/>

            {/* <ul className={containerExtraClass}>
                {topping.length > 0 ? ingredientsList : <Topping topping={null}/>}
            </ul> */}

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

                    {isModalOpen && Object.keys(orderData).length>0 &&

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