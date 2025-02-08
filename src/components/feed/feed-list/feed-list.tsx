import style from "../feed.module.css";

import { FeedListProps } from "../../../service/types";
import FeedListItem from "../feed-item/feed-item";

const FeedList: React.FC<FeedListProps> = (props) => {
    const { orders } = props;

    const feedListItems = orders.map((el, i) => {
        return <FeedListItem key={`${i}__${el._id}`} order={el} />;
    });

    return (
        <ul
            className={`${style.container} ${
                props.extraClass ? props.extraClass : ""
            }`}
        >
            {feedListItems}
        </ul>
    );
};

export default FeedList;
