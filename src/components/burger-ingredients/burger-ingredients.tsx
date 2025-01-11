import React, { useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { BurgerProps } from "../../utils/types";

import style from "./burger-ingredients.module.css";

import IngredientBlock from "./ingredient-block/ingredient-block";

const BurgerIngredients: React.FC<BurgerProps> = (props) => {

    const [currentType, setCurrentType] = useState<string>("bun");

    const bunRef = useRef<HTMLUListElement>(null);
    const sauceRef = useRef<HTMLUListElement>(null);
    const mainRef = useRef<HTMLUListElement>(null);

    const tabHandler = (e: string) => {
        setCurrentType(e);

        let scrollingRef: React.RefObject<HTMLUListElement> | undefined;
        switch (e) {
            case "bun":
                scrollingRef = bunRef;
                break;
            case "sauce":
                scrollingRef = sauceRef;
                break;
            case "main":
                scrollingRef = mainRef;
                break;
        }
        scrollingRef &&
            scrollingRef.current?.scrollIntoView({
                block: "start",
                behavior: "smooth",
            });
    };

    const ingredientBoxRef = useRef<HTMLDivElement>(null);
    
    const onWheelHandler = () => {
        const curScroll = ingredientBoxRef.current?.scrollTop || 0;

        const sauceAnchor = bunRef.current
            ? bunRef.current.offsetTop + bunRef.current.offsetHeight / 2
            : 0;
        const mainAnchor = sauceRef.current
            ? sauceRef.current?.offsetTop + sauceRef.current.offsetHeight / 2
            : 0;

        if (curScroll > sauceAnchor) {
            setCurrentType("sauce");
        }
        if (curScroll > mainAnchor) {
            setCurrentType("main");
        }
        if (curScroll < sauceAnchor) {
            setCurrentType("bun");
        }
    };

    return (
        <section className={style.wrapper}>
            <div className={`text text_type_main-large ${style.title}`}>
                Соберите бургер
            </div>
            <div className={style.switcher}>
                <Tab
                    value="bun"
                    active={currentType === "bun"}
                    onClick={tabHandler}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={currentType === "sauce"}
                    onClick={tabHandler}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={currentType === "main"}
                    onClick={tabHandler}
                >
                    Начинки
                </Tab>
            </div>

            {props.ingredients.length > 0 && (
                <div
                    className={`${style.container}`}
                    ref={ingredientBoxRef}
                    onWheel={onWheelHandler}
                >
                    <IngredientBlock
                        ref={bunRef}
                        value="bun"
                        title="Булки"
                        ingredients={props.ingredients}
                    ></IngredientBlock>
                    <IngredientBlock
                        ref={sauceRef}
                        value="sauce"
                        title="Соусы"
                        ingredients={props.ingredients}
                    ></IngredientBlock>
                    <IngredientBlock
                        ref={mainRef}
                        value="main"
                        title="Начинки"
                        ingredients={props.ingredients}
                    ></IngredientBlock>
                </div>
            )}
        </section>
    );
}

export default BurgerIngredients;
