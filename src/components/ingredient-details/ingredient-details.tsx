import { useAppSelector } from "../../hooks/useAppSelector";
import style from "./ingredient-details.module.css";
import IngredientDetailsItem from "./ingredient-details-item/ingredient-details-item";

function IngredientDetails() {
    const ingredient = useAppSelector((state) => state.detail.ingredient);

    return (
        <figure className={style.ingredient}>
            <img
                src={
                    ingredient?.image_large
                        ? ingredient?.image_large
                        : ingredient?.image
                }
                alt={ingredient?.name}
                className={style.image}
            />

            <figcaption className={`${style.caption} text_type_main-medium`}>
                {ingredient?.name}
            </figcaption>

            <div className={style.content}>
                <IngredientDetailsItem
                    title={`Калории,ккал`}
                    value={ingredient?.calories || 0}
                />
                <IngredientDetailsItem
                    title={`Белки,г`}
                    value={ingredient?.proteins || 0}
                />
                <IngredientDetailsItem
                    title={`Жиры,г`}
                    value={ingredient?.fat || 0}
                />
                <IngredientDetailsItem
                    title={`Углеводы,г`}
                    value={ingredient?.carbohydrates || 0}
                />
            </div>
        </figure>
    );
}

export default IngredientDetails;
