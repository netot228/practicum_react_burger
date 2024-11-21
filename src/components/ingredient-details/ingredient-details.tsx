import {IngredientData} from '../../utils/types';

import style from './ingredient-details.module.css';

interface conentItemPops {
    title: string
    value: number
}
const ContentItem = (props:conentItemPops) => {
    return (
        <div className={style.content_item}>
            <span className={`text_type_main-default ${style.content_title}`}>
                {props.title}
            </span>
            <span className={`text_type_digits-default ${style.content_value}`}>
                {props.value}
            </span>
        </div>
    )
}

function IngredientDetails(props:IngredientData){

    return (
        <figure className={style.ingredient} >
            <img src={props.image_large ? props.image_large : props.image } alt={props.name}  className={style.image}/>

            <figcaption className={`${style.caption} text_type_main-medium`}>
                {props.name}
            </figcaption>

            <div className={style.content}>
                <ContentItem title={`Калории,ккал`} value={props.calories || 0} />
                <ContentItem title={`Белки,г`} value={props.proteins || 0} />
                <ContentItem title={`Жиры,г`} value={props.fat || 0} />
                <ContentItem title={`Углеводы,г`} value={props.carbohydrates || 0} />
            </div>

        </figure>
    )
}

export default IngredientDetails;