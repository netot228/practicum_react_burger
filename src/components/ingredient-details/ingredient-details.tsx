import {IngredientData} from '../../utils/types';

import {useAppSelector} from '../../hooks/useAppSelector';

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

function IngredientDetails(){

    const {ingredient}     = useAppSelector(state=>state.detail);

    return (
        <figure className={style.ingredient} >
            <img src={ingredient?.image_large ? ingredient?.image_large : ingredient?.image } alt={ingredient?.name}  className={style.image}/>

            <figcaption className={`${style.caption} text_type_main-medium`}>
                {ingredient?.name}
            </figcaption>

            <div className={style.content}>
                <ContentItem title={`Калории,ккал`} value={ingredient?.calories || 0} />
                <ContentItem title={`Белки,г`} value={ingredient?.proteins || 0} />
                <ContentItem title={`Жиры,г`} value={ingredient?.fat || 0} />
                <ContentItem title={`Углеводы,г`} value={ingredient?.carbohydrates || 0} />
            </div>

        </figure>
    )
}

export default IngredientDetails;