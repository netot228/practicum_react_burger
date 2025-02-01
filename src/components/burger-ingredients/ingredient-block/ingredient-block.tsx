import { IngredientBlockData } from "../../../service/types";
import React, { useMemo } from "react";
import IngredientItem from "../ingredient-item/ingredient-item";

import style from "../burger-ingredients.module.css";

const IngredientBlock = React.forwardRef(
    (props: IngredientBlockData, ref: React.ForwardedRef<HTMLUListElement>) => {
        const children = useMemo(() => {
            const childrenCollect = props.ingredients.map((el) => {
                if (el.type === props.value) {
                    return <IngredientItem key={el._id} data={el} />;
                }
                return false;
            });

            return childrenCollect;
        }, [props.ingredients, props.value]);

        return (
            <ul ref={ref} className={style.tabcontent}>
                <li
                    key={0}
                    className={`text_type_main-medium ${style.tabcontent_title}`}
                >
                    {props.title}
                </li>
                {children}
            </ul>
        );
    }
);

export default IngredientBlock;
