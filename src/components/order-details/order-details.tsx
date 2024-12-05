
import style from './order-details.module.css';
import {useAppSelector} from '../../hooks/useAppSelector';

function OrderDetails(){

    const orderData = useAppSelector(state=>state.order);

    return (
        <div className={style.order}>

            {orderData
                ?
                    <>
                        <span className={`text_type_main-medium ${style.title}`}>
                            {orderData.notice}
                        </span>
                    </>
                :
                    <>
                        <h4 className={`text_type_digits-large ${style.order_id}`}>
                        {orderData.order?.number}
                        </h4>
                        <span className={`text_type_main-medium ${style.title}`}>
                            {orderData.name}
                        </span>

                        <div className={style.check}>
                            <div className={style.wave1}></div>
                            <div className={style.wave2}></div>
                            <div className={style.wave3}></div>
                            <CheckMarkIcon className={style.check_icon} type="primary" />
                        </div>

                        <span className={`text_type_main-default ${style.title}`}>
                            Ваш заказ начали готовить
                        </span>

                        <span className={`text_type_main-default text_color_inactive ${style.title}`}>
                            Дождитесь готовности на орбитальной станции
                        </span>
                    </>
            }



        </div>
    )
}

export default OrderDetails;