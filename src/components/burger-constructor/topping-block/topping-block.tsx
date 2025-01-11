import { ToppingBlockProps } from "../../../utils/types";
import { useMemo } from "react";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { REMOVE_INGREDIENT } from "../../../services/actions/burger-constructor";
import ToppingItem from "../topping-item/topping-item";
import style from "../burger-constructor.module.css";
import { v4 as uuid } from "uuid";

const ToppingBlock: React.FC<ToppingBlockProps> = (props) => {
    const dispatch = useAppDispatch();
    const { topping, decreaseItem } = props;

    const removeTopping = (uid: string | number | undefined) => {
        const removedItem = topping.find((el) => el.uid === uid);
        dispatch({
            type: REMOVE_INGREDIENT,
            uid,
        });
        decreaseItem(removedItem);
    };

    const ingredientsList = useMemo(() => {
        const toppingCollect =
            topping.length > 0
                ? topping.map((el, i) => {
                      const key = uuid();

                      return (
                          <ToppingItem
                              key={key}
                              removeTopping={removeTopping}
                              topping={el}
                              index={i}
                          />
                      );
                  })
                : [<ToppingItem index={0} key={0} topping={null} />];

        return toppingCollect;
    }, [topping]);

    const containerExtraClass = `${style.container} ${
        topping.length <= 5 && style.hFree
    }`;

    return <ul className={containerExtraClass}>{ingredientsList}</ul>;
};

export default ToppingBlock;
