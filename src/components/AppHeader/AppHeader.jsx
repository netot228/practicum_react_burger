import React from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './AppHeader.module.css';


// type BtnPops = {
//     type: "secondary" | "primary" | "error" | "success" | "disabled"
//     icon?: string
//     text?: string
//     className?: string
// }

function Button(props){

    let Icon;
    switch(props.icon) {
        case 'burger':
            Icon = <BurgerIcon className={style.icon} type={props.type}/>;
            break;
        case 'list':
            Icon = <ListIcon className={style.icon} type={props.type}/>;
            break;
        case 'profile':
            Icon = <ProfileIcon className={style.icon} type={props.type}/>;
            break;
        default:
            Icon = null;
    }

    return (
        <button className={style.button}>
            {props.icon && Icon}
            <span className={`text text_type_main-default ${style[props.type]}`}>{props.text}</span>
        </button>
    )

}

function AppHeader(){
    return(
        <header className={style.header}>
            <div className={style.wrapper}>

                <div className={style.header_item}>
                    <Button text="Конструктор" icon="burger" type="primary"/>
                    <Button text="Лента заказов" icon="list" type="secondary"/>
                </div>

                <div className={style.header_item}>
                    <Button text="Личный кабинет" icon="profile" type="secondary"/>
                </div>

                <Logo className={style.logo} />

            </div>
        </header>
    )
}

export default AppHeader;