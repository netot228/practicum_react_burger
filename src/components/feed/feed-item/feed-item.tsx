import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelector";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../feed.module.css";
import { useEffect, useMemo } from "react";

import { FeedListItemProps } from "../../../service/types";

import { Link, useLocation } from "react-router-dom";

type TFeedIconProps = {
    icon: string;
    alt?: string;
    moreQnt?: number;
};

const FeedListItemIcon: React.FC<TFeedIconProps> = (props) => {
    const { icon, moreQnt, alt } = props;

    return (
        <div className={style.order_item}>
            <img src={icon} alt={alt} />
            {moreQnt && <div className={style.order_item_more}>+{moreQnt}</div>}
        </div>
    );
};

const FeedListItem: React.FC<FeedListItemProps> = (props) => {
    const location = useLocation();

    const ingredients = useAppSelector(
        (store) => store.ingredients.ingredients
    );

    const {
        number,
        createdAt,
        ingredients: orderIngredients,
        name,
        _id,
    } = props.order;

    const burgerCost = orderIngredients.reduce((sum, el) => {
        let needItem = ingredients.find((item) => item._id === el);
        if (needItem) {
            return sum + needItem?.price;
        }
        return sum;
    }, 0);

    const ingredientIcons = orderIngredients.map((el, i, arr) => {
        const currentIngredient = ingredients.find((item) => item._id === el);

        if (currentIngredient && i < 6) {
            const { _id, name, image } = currentIngredient;

            if (i === 0 && arr.length > 6) {
                return (
                    <FeedListItemIcon
                        key={`${i}__${_id}`}
                        icon={image}
                        alt={name}
                        moreQnt={arr.length - 6}
                    />
                );
            } else {
                return (
                    <FeedListItemIcon
                        key={`${i}__${_id}`}
                        icon={image}
                        alt={name}
                    />
                );
            }
        }
        return null;
    });

    return (
        <li className={style.order}>
            <Link
                to={`./:${_id}`}
                state={{ background: location, feed_id: _id }}
            >
                <div className={style.order_hat}>
                    <div className={style.order_number}>#{number}</div>
                    <div className={style.order_date} data-check={createdAt}>
                        {/* FormattedDate - некорректно отрабатывает даты (вчера/сегодня) */}
                        <FormattedDate date={new Date(createdAt)} />
                    </div>
                </div>
                <div className={style.order_title}>{name}</div>
                <div className={style.order_footer}>
                    <div className={style.order_details}>{ingredientIcons}</div>
                    <div className={style.order_cost}>
                        <span
                            className={`${style.order_cost_sum} text_type_digits-medium`}
                        >
                            {burgerCost}
                        </span>
                        <CurrencyIcon
                            className={style.order_cost_icon}
                            type="primary"
                        />
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default FeedListItem;
