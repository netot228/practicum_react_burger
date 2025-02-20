import { IngredientProps } from "../../../service/types";

import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import style from "../burger-ingredients.module.css";
import { Link, useLocation } from "react-router-dom";

const IngredientItem: React.FC<IngredientProps> = (props) => {
    const location = useLocation();
    const { _id, image, name, price, qnt } = props.data;
    const [{ opacity, isDragging }, dragRef] = useDrag(
        {
            type: "ingredient",
            item: { _id },
            canDrag: true,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                opacity: monitor.isDragging() ? 0 : 1,
            }),
        },
        
        []
    );

    return (
        <li className={style.ingredient_list_item}>
            <Link
                to={`ingredients/:${_id}`}
                state={{ background: location, id: _id }}
            >
                <figure ref={dragRef} className={style.ingredient}>
                    <img src={image} alt={name} />
                    <p
                        className={`${style.ingredient_price} text_type_digits-default`}
                    >
                        {price}
                        <CurrencyIcon
                            className={style.ingredient_icon}
                            type="primary"
                        />
                    </p>
                    <figcaption
                        className={`${style.ingredient_name} text_type_main-default`}
                    >
                        {name}
                    </figcaption>
                    {qnt && (
                        <Counter count={qnt} size="default" extraClass="m-1" />
                    )}
                </figure>
            </Link>
        </li>
    );
};

export default IngredientItem;
