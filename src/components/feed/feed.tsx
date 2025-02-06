import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import Loader from "../../ui/loader";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./feed.module.css";
import { useEffect, useMemo } from "react";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import {
    WS_FEED_CONNECT,
    WS_FEED_ERROR,
    WS_FEED_CLOSE,
    WS_FEED_GET_MESSAGE,
    WS_FEED_SEND_MESSAGE,
} from "../../redux/actions/feed";

import FeedList from "./feed-list/feed-list";

const OrderFeedItem: React.FC<{ number: number }> = (props) => {
    const { number } = props;
    return <li className={style.board_list_item}>{number}</li>;
};

const Feed: React.FC = () => {
    const dispatch = useAppDispatch();

    const { orders, totalToday, total } = useAppSelector((state) => state.feed);

    const readyOrders = useMemo(() => {
        let items = orders
            .filter((el) => el.status === "done")
            .map((el, i) => (
                <OrderFeedItem key={`${i}__${el._id}`} number={el.number} />
            ));

        return items.length > 10 ? items.slice(0, 10) : items;
    }, [orders]);

    const awaitOrders = useMemo(() => {
        let items = orders
            .filter((el) => el.status === "created" || el.status === "pending")
            .map((el, i) => (
                <OrderFeedItem key={`${i}__${el._id}`} number={el.number} />
            ));

        return items.length > 10 ? items.slice(0, 10) : items;
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

                {orders.length > 0 && <FeedList orders={orders} />}
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

                            <ul className={style.board_list_wrapper}>
                                {awaitOrders}
                            </ul>
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
};

export default Feed;
