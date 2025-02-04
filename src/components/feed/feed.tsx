import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import Loader from "../../ui/loader";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./feed.module.css";
import { useEffect, useMemo } from "react";

import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE,
} from "../../redux/actions/feed";

const OrderFeedItem: React.FC<{ number: number }> = (props) => {
    const { number } = props;
    return (
        // <div className={style.board_list_wrapper}>
        <li className={style.board_list_item}>{number}</li>
        // </div>
    );
};

function Feed() {
    const dispatch = useAppDispatch();

    const { orders, totalToday, total, success } = useAppSelector(
        (state) => state.feed
    );

    const readyOrders = useMemo(() => {
        let items = orders.map((el, i) => {
            if (el.status === "done") {
                return (
                    <OrderFeedItem key={`${i}__${el._id}`} number={el.number} />
                );
            }
            return false;
        });
        return items;
    }, [orders]);

    useEffect(() => {
        dispatch({ type: WS_FEED_CONNECT });

        return () => {
            dispatch({ type: WS_FEED_CLOSE });
        };
    }, []);

    return (
        <>
            <section className={style.wrapper}>
                <div className={`text text_type_main-large ${style.title}`}>
                    Лента заказов
                </div>

                <div className={style.container}>
                    {/* orderItem */}

                    <div className={style.order}>
                        <div className={style.order_hat}>
                            <div className={style.order_number}>#232324314</div>
                            <div className={style.order_date}>Вчера, 13:50</div>
                        </div>
                        <div className={style.order_title}>
                            Black Hole Singularity острый бургер
                        </div>
                        <div className={style.order_footer}>
                            <div className={style.order_details}>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/sauce-01.png"
                                        alt=""
                                    />
                                    <div className={style.order_item_more}>
                                        +25
                                    </div>
                                </div>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/sauce-04.png"
                                        alt=""
                                    />
                                </div>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/sp_1.png"
                                        alt=""
                                    />
                                </div>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/core.png"
                                        alt=""
                                    />
                                </div>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/sauce-01.png"
                                        alt=""
                                    />
                                </div>
                                <div className={style.order_item}>
                                    <img
                                        src="https://code.s3.yandex.net/react/code/bun-01.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className={style.order_cost}>
                                <span
                                    className={`${style.order_cost_sum} text_type_digits-medium`}
                                >
                                    {510}
                                </span>
                                <CurrencyIcon
                                    className={style.order_cost_icon}
                                    type="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={style.wrapper}>
                <div className={style.board}>
                    <div className={style.board_list}>
                        <div className={`${style.ready} ${style.board_col}`}>
                            <div className={style.board_title}>Готовы:</div>

                            <ul className={style.board_list_wrapper}>
                                {readyOrders}
                            </ul>
                        </div>

                        <div className={style.board_col}>
                            <div className={style.board_title}>В работе:</div>
                            <div className={style.board_list_wrapper}>
                                <div className={style.board_list_item}>
                                    034533
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.board_stat}>
                        <div className={style.board_title}>
                            Выполнено за все время:
                        </div>
                        <div className={style.board_big_digit}>
                            {total > 0 ? total : <Loader />}
                        </div>
                    </div>

                    <div className={style.board_stat}>
                        <div className={style.board_title}>
                            Выполнено за сегодня:
                        </div>
                        <div className={style.board_big_digit}>
                            {totalToday > 0 ? totalToday : <Loader />}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Feed;
