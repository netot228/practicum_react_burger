import { useAppSelector } from "../../../hooks/useAppSelector";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../feed.module.css";

import { FeedListItemProps } from "../../../service/types";

import { Link, useLocation } from "react-router-dom";

type TFeedIconProps = {
    icon: string;
    alt?: string;
    moreQnt?: number;
};

export const FeedListItemIcon: React.FC<TFeedIconProps> = (props) => {
    const { icon, moreQnt, alt } = props;

    return (
        <div className={style.feed_item_ingredient}>
            <img src={icon} alt={alt} />
            {moreQnt && <div className={style.feed_item_more}>+{moreQnt}</div>}
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
        <li className={style.feed_item}>
            <Link
                to={`./:${number}`}
                state={{ background: location, feed_number: number }}
            >
                <div className={style.feed_item_hat}>
                    <div className={style.feed_item_number}>#{number}</div>
                    <div
                        className={style.feed_item_date}
                        data-check={createdAt}
                    >
                        {/* FormattedDate - некорректно отрабатывает даты (вчера/сегодня) */}
                        <FormattedDate date={new Date(createdAt)} />
                    </div>
                </div>
                <div className={style.feed_item_title}>{name}</div>
                <div className={style.feed_item_footer}>
                    <div className={style.feed_item_details}>
                        {ingredientIcons}
                    </div>
                    <div className={style.feed_item_cost}>
                        <span
                            className={`${style.feed_item_cost_sum} text_type_digits-medium`}
                        >
                            {burgerCost}
                        </span>
                        <CurrencyIcon
                            className={style.feed_item_cost_icon}
                            type="primary"
                        />
                    </div>
                </div>
            </Link>
        </li>
    );
};

export default FeedListItem;
