import { IngredientData, DragItem } from "../../service/types";

import { useMemo } from "react";
import { useDrop } from "react-dnd";
import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import {
    sendOrder,
    CLEAR_ORDER_DETAILS,
} from "../../redux/actions/order-details";
import OrderDetails from "../order-details/order-details";

import { refreshToken } from "../../redux/actions/auth";

import {
    INCREASE_INGREDIENT_ITEM,
    DECREASE_INGREDIENT_ITEM,
    getIngredients,
} from "../../redux/actions/burger-ingredients";
import {
    ADD_INGREDIENT,
    ADD_BUN,
    CLEAR_BURGER,
} from "../../redux/actions/burger-constructor";

import style from "./burger-constructor.module.css";

import { v4 as uuid } from "uuid";
import Bun from "./bun/bun";

import ToppingBlock from "./topping-block/topping-block";

import { useNavigate } from "react-router-dom";
import Loader from "../../ui/loader";

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const isUserDetected = useAppSelector((state) => state.auth.success);
    const orderPocessing = useAppSelector((state) => state.order.processing);

    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    );
    const topping = useAppSelector((state) => state.burger.topping);
    const bun = useAppSelector((state) => state.burger.bun);

    const { success: orderCreated, notice: orderNotice } = useAppSelector(
        (state) => state.order
    );

    const decreaseItem = (item: IngredientData | undefined) => {
        dispatch({
            type: DECREASE_INGREDIENT_ITEM,
            ingredient: item,
        });
    };

    const dropHandler = (item: DragItem) => {
        const ingredient = ingredients.find((el) => el._id === item._id);
        const uid = uuid();

        if (ingredient?.type === "bun" && bun && bun !== ingredient) {
            decreaseItem(bun);
        }

        dispatch({
            type: ingredient?.type === "bun" ? ADD_BUN : ADD_INGREDIENT,
            ingredient: ingredient,
            uid,
        });

        dispatch({
            type: INCREASE_INGREDIENT_ITEM,
            ingredient: ingredient,
        });
    };

    const total = useMemo(() => {
        return topping.length > 0 && bun
            ? (topping as IngredientData[]).reduce(
                  (total, el) => total + el.price,
                  0
              ) +
                  bun.price * 2
            : 0;
    }, [topping, bun]);

    const { isModalOpen, closeModal, openModal } = useModal(false);
    const confirmOrder = () => {
        if (!isUserDetected) {
            return navigate("/login");
        }
        if (isModalOpen) {
            console.log("confirmOrder - CLEAR_ORDER_DETAILS");
            closeModal();
            dispatch({ type: CLEAR_ORDER_DETAILS });
            dispatch(getIngredients());
            dispatch({ type: CLEAR_BURGER });
        } else {
            let sendOrderData = topping.map((el) => el._id);

            if (bun) {
                sendOrderData.push(bun._id);
            }
            const timeOut = new Date().getTime() - 5 * 60 * 1000;
            if (
                localStorage.tokenTimeout &&
                Number(localStorage.tokenTimeout) < timeOut
            ) {
                console.log("token просрочен рефреш");
                dispatch(refreshToken(localStorage.refreshToken)).then(
                    (res) => {
                        if (res.success) {
                            console.log("refreshToken DONE");
                            dispatch(sendOrder(sendOrderData));
                            openModal();
                        } else {
                            console.log("refreshToken ERROR");
                        }
                        console.dir(res);
                    }
                );
            } else {
                dispatch(sendOrder(sendOrderData));
                openModal();
            }
        }
    };

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item: DragItem) {
            dropHandler(item);
        },
        collect: (monitor) => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <section
            ref={dropTarget}
            className={`${style.wrapper}  ${isHover && style.canAccepted} `}
        >
            <Bun bun={bun} type="top" />

            <ToppingBlock decreaseItem={decreaseItem} topping={topping} />

            <Bun bun={bun} type="bottom" />

            {topping.length > 0 && bun && (
                <>
                    <div className={style.confirm_order}>
                        <span
                            className={`${style.confirm_order_total} text_type_digits-medium`}
                        >
                            {total}
                        </span>
                        <CurrencyIcon
                            className={style.confirm_order_icon}
                            type="primary"
                        />
                        <Button
                            extraClass={style.confirm_order_btn}
                            htmlType="button"
                            type="primary"
                            size="large"
                            onClick={confirmOrder}
                        >
                            {orderPocessing ? (
                                <Loader text={"Оформляю...."} />
                            ) : (
                                "Оформить заказ"
                            )}
                        </Button>
                    </div>

                    {isModalOpen && (orderCreated || orderNotice) && (
                        <Modal onClose={confirmOrder}>
                            <OrderDetails />
                        </Modal>
                    )}
                </>
            )}
        </section>
    );
}

export default BurgerConstructor;
