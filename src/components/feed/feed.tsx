import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./feed.module.css";

function Feed() {
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
                            <div className={style.board_list_wrapper}>
                                <div className={style.board_list_item}>
                                    034533
                                </div>
                                <div className={style.board_list_item}>
                                    034532
                                </div>
                                <div className={style.board_list_item}>
                                    034530
                                </div>
                                <div className={style.board_list_item}>
                                    034527
                                </div>
                                <div className={style.board_list_item}>
                                    034533
                                </div>
                                <div className={style.board_list_item}>
                                    034532
                                </div>
                                <div className={style.board_list_item}>
                                    034530
                                </div>
                            </div>
                        </div>

                        <div className={style.board_col}>
                            <div className={style.board_title}>В работе:</div>
                            <div className={style.board_list_wrapper}>
                                <div className={style.board_list_item}>
                                    034533
                                </div>
                                <div className={style.board_list_item}>
                                    034532
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.board_stat}>
                        <div className={style.board_title}>
                            Выполнено за все время:
                        </div>
                        <div className={style.board_big_digit}>28 752</div>
                    </div>

                    <div className={style.board_stat}>
                        <div className={style.board_title}>
                            Выполнено за сегодня:
                        </div>
                        <div className={style.board_big_digit}>138</div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Feed;
