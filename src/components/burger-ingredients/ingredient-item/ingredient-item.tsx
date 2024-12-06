import { IngredientData } from "../../../utils/types";

import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../../ingredient-details/ingredient-details";

import Modal from "../../modal/modal";
import { useModal } from "../../../hooks/useModal";
import { useAppDispatch } from "../../../hooks/useAppSelector";

import { useDrag } from "react-dnd";

import {
    SET_SELECTED_INGREDIENT,
    CLEAR_SELECTED_INGREDIENT,
} from "../../../services/actions/ingredient-details";

import style from "../burger-ingredients.module.css";

interface IngredientProps {
    data: IngredientData;
    key?: string | number;
}

const IngredientItem = (props: IngredientProps) => {
    const dispatch = useAppDispatch();

    const { isModalOpen, closeModal, openModal } = useModal(false);

    const { _id, image, name, price, qnt } = props.data;
    const showIngredient = () => {
        if (isModalOpen) {
            dispatch({
                type: CLEAR_SELECTED_INGREDIENT,
            });
            closeModal();
        } else {
            dispatch({
                type: SET_SELECTED_INGREDIENT,
                ingredient: props.data,
            });
            openModal();
        }
    };

    const [, dragRef] = useDrag(
        {
            type: "ingredient",
            item: { _id },
        },
        []
    );

    return (
        <li className={style.ingredient_list_item}>
            <figure
                ref={dragRef}
                className={style.ingredient}
                onClick={showIngredient}
            >
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
                {qnt && <Counter count={qnt} size="default" extraClass="m-1" />}
            </figure>

            {isModalOpen && (
                <Modal title="Детали ингредиента" onClose={showIngredient}>
                    <IngredientDetails />
                </Modal>
            )}
        </li>
    );
};

export default IngredientItem;
