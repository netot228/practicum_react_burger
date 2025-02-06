import { useAppSelector, useAppDispatch } from "../../../hooks/useAppSelector";
import {
    CurrencyIcon,
    FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    getOrder,
    CLEAR_SELECTED_ORDER,
} from "../../../redux/actions/selected-order";

import style from "../feed.module.css";

import { IngredientData } from "../../../service/types";

import { FeedListItemIcon } from "../feed-item/feed-item";

type TIngredientCollect = {
    [key: string]: {
        desc: IngredientData;
        qnt: number;
    };
};
type TFeedDetailsList = {
    orderList: TIngredientCollect;
};

const FeedDetailsListItem: React.FC<TFeedDetailsList> = (props) => {
    const { orderList } = props;

    const children = Object.values(orderList).map((el, i) => {
        return (
            <div key={i} className={style.feedDetails_row}>
                <div className={style.feedDetails_rowPart}>
                    <FeedListItemIcon icon={el.desc.image} />
                    <div className={style.feedDetails_rowName}>
                        {el.desc.name}
                    </div>
                </div>
                <div className={style.feedDetails_rowPart}>
                    <span className={style.feed_item_cost_sum}>
                        {el.qnt} x {el.desc.price}
                    </span>

                    <CurrencyIcon
                        className={style.feed_item_cost_icon}
                        type="primary"
                    />
                </div>
            </div>
        );
    });

    return <>{children}</>;
};

export default function FeedDetails() {
    console.dir("refresh FeedDetails");

    const dispatch = useAppDispatch();

    const order = useAppSelector((state) => state.selectedOrder.order);

    const location = useLocation();
    const navigate = useNavigate();

    // console.dir(location);

    const ingredients = useAppSelector(
        (store) => store.ingredients.ingredients
    );

    useEffect(() => {
        if (!order) {
            let feedItemNumber = null;

            if (location.state?.feed_number) {
                feedItemNumber = location.state.feed_number;
            } else if (location.pathname.match("/feed/:")) {
                feedItemNumber = location.pathname.replace(/^\/feed\/:/, "");
            }

            if (feedItemNumber) {
                dispatch(getOrder(feedItemNumber)).then((res) => {
                    // console.dir(res);
                    if (
                        !res.success ||
                        res.orders.length > 1 ||
                        res.orders.length === 0
                    ) {
                        navigate("*");
                    }
                    // // if(res)
                    // console.log("dispatch(getOrder)");
                    // console.dir(res);
                });
            }
        }
        // return () => {
        //     dispatch({
        //         type: CLEAR_SELECTED_ORDER,
        //     });
        // };
    }, [order, location]);

    const {
        number,
        createdAt,
        ingredients: orderIngredients,
        name,
        status,
    } = order
        ? order
        : {
              number: 0,
              createdAt: 0,
              ingredients: [],
              name: "",
              status: "",
          };

    const burgerCost = orderIngredients.reduce((sum, el) => {
        let needItem = ingredients.find((item) => item._id === el);
        if (needItem) {
            return sum + needItem?.price;
        }
        return sum;
    }, 0);

    const statusTranslate = status.match("done") ? "Выполнен" : "В работе";

    let ingredientCollect: TIngredientCollect = {};
    orderIngredients.forEach((el) => {
        if (ingredientCollect[el]) {
            ++ingredientCollect[el].qnt;
        } else {
            let curI = ingredients.find((i) => i._id === el);

            if (curI) {
                ingredientCollect[el] = {
                    desc: curI,
                    qnt: 1,
                };
            }
        }
    });

    // !!!! if incorrect order

    return (
        <div className={style.feedDetails}>
            <div className={style.feed_item_number}>#{number}</div>
            <div className={style.feed_item_title}>{name}</div>
            <div className={style.feed_item_status}>{statusTranslate}</div>

            <div className={style.feed_item_title}>Состав:</div>

            <div className={style.container}>
                <FeedDetailsListItem orderList={ingredientCollect} />
            </div>

            <div className={style.feed_item_footer}>
                <div className={style.feed_item_date} data-check={createdAt}>
                    {/* FormattedDate - некорректно отрабатывает даты (вчера/сегодня) */}
                    <FormattedDate date={new Date(createdAt)} />
                </div>
                <div className={style.feed_item_cost}>
                    <span className={style.feed_item_cost_sum}>
                        {burgerCost}
                    </span>
                    <CurrencyIcon
                        className={style.feed_item_cost_icon}
                        type="primary"
                    />
                </div>
            </div>
        </div>
    );
}
