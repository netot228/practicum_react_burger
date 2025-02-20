import { useAppSelector } from "../../../hooks/useAppSelector";
import style from "../profile.module.css";
import FeedList from "../../feed/feed-list/feed-list";
import Loader from "../../../ui/loader";

const ProfileOrders: React.FC = () => {
    const { orders } = useAppSelector((state) => state.userFeed);

    return (
        <div className={style.feed}>
            {orders.length > 0 ? (
                <FeedList extraClass={style.feedContainer} orders={orders} />
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProfileOrders;
