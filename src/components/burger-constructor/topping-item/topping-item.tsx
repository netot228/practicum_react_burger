import { IngredientData, DragItem } from "../../../utils/types";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../../hooks/useAppSelector";
import { SORT_TOPPING } from "../../../services/actions/burger-constructor";
import style from "../burger-constructor.module.css";

interface ToppingProps {
    topping: IngredientData | null;
    index: number;
    removeTopping?: (uid: string | number | undefined) => void;
    moveTopping?: (dragIndex: number, hoverIndex: number) => void;
}

const ToppingItem: React.FC<ToppingProps> = (props: ToppingProps) => {
    const { name, price, image, uid } = props.topping
        ? props.topping
        : {
              name: "Выберите начинку",
              price: 0,
              image: "",
              uid: "",
          };

    const removeTopping = props.removeTopping || null;
    const dispatch = useAppDispatch();

    const deleteTopping = () => {
        removeTopping && removeTopping(uid);
    };

    const ref = useRef<HTMLLIElement>(null);

    const index = props.index || 0;

    const [{ isDragging }, drag] = useDrag(
        {
            type: "topping",
            item: () => {
                return { uid, index };
            },
            collect: (monitor: any) => ({
                isDragging: monitor.isDragging(),
            }),
        },
        [uid, index]
    );

    const [, drop] = useDrop(
        {
            accept: "topping",
            hover(item: DragItem, monitor) {
                if (!ref.current) {
                    return;
                }

                const dragIndex = item.index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                const hoverItemBox = ref.current?.getBoundingClientRect();
                const hoverMiddleY =
                    (hoverItemBox.bottom - hoverItemBox.top) / 2;

                const clientOffset = monitor.getClientOffset(); //{x:number,y:number}
                const hoverY = (clientOffset as any).y - hoverItemBox.top;

                if (
                    dragIndex &&
                    dragIndex < hoverIndex &&
                    hoverY < hoverMiddleY
                ) {
                    return;
                }

                if (
                    dragIndex &&
                    dragIndex > hoverIndex &&
                    hoverY > hoverMiddleY
                ) {
                    return;
                }

                dispatch({
                    type: SORT_TOPPING,
                    moveItemToPos: hoverIndex,
                    moveItemFromPos: dragIndex,
                });

                item.index = hoverIndex;
            },
        },
        []
    );

    drag(drop(ref));

    const extraClass = `${style.item} ${!props.topping && style.undefinedBun} ${
        isDragging && style.is_Dragging
    }`;

    return (
        <li ref={ref} className={extraClass}>
            <DragIcon className={style.drug_btn} type="primary" />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image}
                extraClass={style.bun}
                handleClose={deleteTopping}
            />
        </li>
    );
};

export default ToppingItem;
