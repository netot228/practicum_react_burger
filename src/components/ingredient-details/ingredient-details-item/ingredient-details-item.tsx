import style from "../ingredient-details.module.css";

interface IngredientDetailsItemPops {
    title: string;
    value: number;
}
const IngredientDetailsItem = (props: IngredientDetailsItemPops) => {
    return (
        <div className={style.content_item}>
            <span className={`text_type_main-default ${style.content_title}`}>
                {props.title}
            </span>
            <span className={`text_type_digits-default ${style.content_value}`}>
                {props.value}
            </span>
        </div>
    );
};

export default IngredientDetailsItem;
