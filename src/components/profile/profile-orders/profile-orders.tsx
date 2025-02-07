import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelector";
import Loader from "../../../ui/loader";
import style from "../profile.module.css";
import { useEffect, useMemo } from "react";
import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CLOSE,
} from "../../../redux/actions/user-feed";

import FeedList from "../../feed/feed-list/feed-list";

const ProfileOrders: React.FC = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.userFeed);

    return (
        <div className={style.feed}>
            {orders.length > 0 && (
                <FeedList extraClass={style.feedContainer} orders={orders} />
            )}
        </div>
    );
};

export default ProfileOrders;
