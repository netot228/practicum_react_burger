import style from "./order-details.module.css";
import { useAppSelector } from "../../hooks/useAppSelector";

import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderDetails() {
    const { notice, orderData, success } = useAppSelector(
        (state) => state.order
    );

    return (
        <div className={style.order}>
            {success && orderData !== null ? (
                <>
                    <h4
                        data-testid="order_num"
                        className={`text_type_digits-large ${style.order_id}`}
                    >
                        {orderData?.order.number}
                    </h4>
                    <span className={`text_type_main-medium ${style.title}`}>
                        {orderData?.name}
                    </span>

                    <div className={style.check}>
                        <div className={style.wave1}></div>
                        <div className={style.wave2}></div>
                        <div className={style.wave3}></div>
                        <CheckMarkIcon
                            className={style.check_icon}
                            type="primary"
                        />
                    </div>

                    <span className={`text_type_main-default ${style.title}`}>
                        Ваш заказ начали готовить
                    </span>

                    <span
                        className={`text_type_main-default text_color_inactive ${style.title}`}
                    >
                        Дождитесь готовности на орбитальной станции
                    </span>
                </>
            ) : (
                <>
                    <span className={`text_type_main-medium ${style.title}`}>
                        {notice}
                    </span>
                </>
            )}
        </div>
    );
}
