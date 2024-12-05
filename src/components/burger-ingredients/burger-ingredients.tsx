import React, { useRef, useState, useMemo, SyntheticEvent } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';
import {useAppDispatch} from '../../hooks/useAppSelector';

import IngredientDetails from '../ingredient-details/ingredient-details';

import style from './burger-ingredients.module.css';
import {IngredientData} from '../../utils/types';

import { useDrag } from "react-dnd";

import {SET_SELECTED_INGREDIENT, CLEAR_SELECTED_INGREDIENT} from '../../services/actions/ingredient-details';

interface BurgerProps {
    ingredients: IngredientData[]
}

interface TabContentData {
    ingredients: IngredientData[]
    value: string
    title: string
}

interface IngredientProps {
    data: IngredientData
    key?: string|number
}

const Ingredient = (props:IngredientProps) => {

    const dispatch = useAppDispatch();

    const {isModalOpen, closeModal, openModal } = useModal(false);

    const {_id, image, name, price, qnt} = props.data;
    const showIngredient = ()=>{

        if(isModalOpen){
            dispatch({
                type: CLEAR_SELECTED_INGREDIENT
            })
            closeModal();
        } else {
            dispatch({
                type: SET_SELECTED_INGREDIENT,
                ingredient: props.data
            })
            openModal();
        }
    }

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {_id}
    }, []);

    return(
        <li className={style.ingredient_list_item}>
            <figure ref={dragRef} className={style.ingredient} onClick={showIngredient}>
                <img src={image} alt={name} />
                <p className={`${style.ingredient_price} text_type_digits-default`}>
                    {price}
                    <CurrencyIcon className={style.ingredient_icon} type="primary" />
                </p>
                <figcaption className={`${style.ingredient_name} text_type_main-default`}>
                    {name}
                </figcaption>
                {qnt &&  <Counter count={qnt} size="default" extraClass="m-1" />}

            </figure>

            {isModalOpen &&

                <Modal title='Детали ингредиента' onClose={showIngredient} >
                    <IngredientDetails />
                </Modal>

            }
        </li>

    )
}

const TabContent = React.forwardRef((props:TabContentData, ref: React.ForwardedRef<HTMLUListElement>) => {

    const children = useMemo(
        ()=>{
            const childrenCollect = props.ingredients.map(el=>{
                if(el.type === props.value) {
                    return <Ingredient key={el._id} data={el}/>
                }
                return false;
            })

            return childrenCollect;
        }, [props.ingredients, props.value]
    )

    return (
        <ul ref={ref} className={style.tabcontent}>
            <li key={0}  className={`text_type_main-medium ${style.tabcontent_title}`}>
                {props.title}
            </li>
            {children}
        </ul>
    )
})

function BurgerIngredients(props:BurgerProps){

    const [currentType, setCurrentType] = useState('bun');

    const bunRef    = useRef<HTMLUListElement>(null);
    const sauceRef  = useRef<HTMLUListElement>(null);
    const mainRef   = useRef<HTMLUListElement>(null);

    const tabHandler = (e:string) => {
        setCurrentType(e);

        let scrollingRef: React.RefObject<HTMLUListElement> | undefined;
        switch(e){
            case 'bun':
                scrollingRef = bunRef;
                break;
            case 'sauce':
                scrollingRef = sauceRef;
                break;
            case 'main':
                scrollingRef = mainRef;
                break;
        }
        scrollingRef && scrollingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" })

    }

    const ingredientBoxRef = useRef<HTMLDivElement>(null);
    const onWheelHandler = (e:SyntheticEvent)=>{

        const curScroll     = ingredientBoxRef.current?.scrollTop || 0;

        const sauceAnchor   = bunRef.current ? bunRef.current.offsetTop + bunRef.current.offsetHeight/2 : 0;
        const mainAnchor    = sauceRef.current ? sauceRef.current?.offsetTop + sauceRef.current.offsetHeight/2 : 0;

        if(curScroll>sauceAnchor){
            setCurrentType('sauce')
        }
        if(curScroll>mainAnchor){
            setCurrentType('main')
        }
        if(curScroll<sauceAnchor){
            setCurrentType('bun')
        }

    }

    return(
        <section className={style.wrapper}>
            <div className={`text text_type_main-large ${style.title}`}>Соберите бургер</div>
            <div className={style.switcher}>
                <Tab value="bun" active={currentType === 'bun'} onClick={tabHandler}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentType === 'sauce'} onClick={tabHandler}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentType === 'main'} onClick={tabHandler}>
                    Начинки
                </Tab>
            </div>

            {props.ingredients.length>0 &&
                <div className={`${style.container}`} ref={ingredientBoxRef} onWheel={onWheelHandler}>
                    <TabContent ref={bunRef}  value="bun" title="Булки" ingredients={props.ingredients}></TabContent>
                    <TabContent ref={sauceRef}  value="sauce" title="Соусы" ingredients={props.ingredients}></TabContent>
                    <TabContent ref={mainRef}  value="main" title="Начинки" ingredients={props.ingredients}></TabContent>
                </div>
            }

        </section>
    )
}

export default BurgerIngredients;