import React, { useRef, useState, useMemo, useCallback } from 'react';
import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import {useModal} from'../../hooks/useModal';

import IngredientDetails from '../ingredient-details/ingredient-details';

import style from './burger-ingredients.module.css';
import {IngredientData} from '../../utils/types';

import { useDrag } from "react-dnd";


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

    const {isModalOpen, closeModal, openModal } = useModal(false);

    const {type, _id} = props.data;
    const showIngredient = ()=>{

        if(isModalOpen){
            closeModal();
        } else {
            openModal();
        }

    }

    const [, dragRef] = useDrag({
        type: type === 'bun' ? 'bun' : 'ingredient',
        item: {_id},
        // collect: monitor => ({
        //     isDrag: monitor.isDragging()
        // })
    }, []);

    return(
        <li  key={props.data._id} className={style.ingredient_list_item}>
            <figure ref={dragRef} className={style.ingredient} onClick={showIngredient}>
                <img src={props.data.image} alt={props.data.name} />
                <p className={`${style.ingredient_price} text_type_digits-default`}>
                    {props.data.price}
                    <CurrencyIcon className={style.ingredient_icon} type="primary" />
                </p>
                <figcaption className={`${style.ingredient_name} text_type_main-default`}>
                    {props.data.name}
                </figcaption>
                {props.data.qnt &&  <Counter count={props.data.qnt} size="default" extraClass="m-1" />}

            </figure>

            {isModalOpen &&

                <Modal title='Детали ингредиента' onClose={showIngredient} >
                    <IngredientDetails  {...props.data} />
                </Modal>

            }
        </li>

    )
}

const TabContent = React.forwardRef((props:TabContentData, ref: React.ForwardedRef<HTMLLIElement>) => {

    // добавил useMemo из учебного интереса
    // при клике по табам родителя (чтобы доскролить до нужной позииц)
    // дети раздела каждый раз перересовываются
    // целесообразно ли использовать при этом useMemo
    // или я впринципе не в ту сторону повернул структурно?

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

    // const children = props.ingredients.map(el=>{
    //     if(el.type === props.value) {
    //         return <Ingredient key={el._id} data={el}/>
    //     }
    //     return false;
    // })

    return (
        <ul  className={style.tabcontent}>
            <li key={0} ref={ref} className={`text_type_main-medium ${style.tabcontent_title}`}>
                {props.title}
            </li>
            {children}
        </ul>
    )
})

function BurgerIngredients(props:BurgerProps){

    const [currentType, setCurrentType] = useState('bun');

    const bunRef    = useRef<HTMLLIElement>(null);
    const sauceRef  = useRef<HTMLLIElement>(null);
    const mainRef   = useRef<HTMLLIElement>(null);

    const tabHandle = (e:string) => {
        setCurrentType(e);
        let scrollingRef: React.RefObject<HTMLLIElement> | undefined;
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

    return(
        <section className={style.wrapper}>
            <div className={`text text_type_main-large ${style.title}`}>Соберите бургер</div>
            <div className={style.switcher}>
                <Tab value="bun" active={currentType === 'bun'} onClick={tabHandle}>
                    Булки
                </Tab>
                <Tab value="sauce" active={currentType === 'sauce'} onClick={tabHandle}>
                    Соусы
                </Tab>
                <Tab value="main" active={currentType === 'main'} onClick={tabHandle}>
                    Начинки
                </Tab>
            </div>

            {props.ingredients.length>0 &&
                <div className={`${style.container}`}>
                    <TabContent ref={bunRef}  value="bun" title="Булки" ingredients={props.ingredients}></TabContent>
                    <TabContent ref={sauceRef}  value="sauce" title="Соусы" ingredients={props.ingredients}></TabContent>
                    <TabContent ref={mainRef}  value="main" title="Начинки" ingredients={props.ingredients}></TabContent>
                </div>
            }

        </section>
    )
}

export default BurgerIngredients;