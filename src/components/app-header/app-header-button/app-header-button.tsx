import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../app-header.module.css";

import { useNavigate, NavLink } from "react-router-dom";

type BtnPops = {
    type: "secondary" | "primary" | "error" | "success" | "disabled";
    icon?: string;
    text?: string;
    className?: string;
    path: string;
};

function HeaderButton(props: BtnPops) {
    let Icon;
    switch (props.icon) {
        case "burger":
            Icon = <BurgerIcon className={style.icon} type={props.type} />;
            break;
        case "list":
            Icon = <ListIcon className={style.icon} type={props.type} />;
            break;
        case "profile":
            Icon = <ProfileIcon className={style.icon} type={props.type} />;
            break;
        default:
            Icon = null;
    }

    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? style.activebtn : style.button
            }
            to={props.path}
        >
            {props.icon && Icon}
            <span
                className={`text text_type_main-default ${style[props.type]}`}
            >
                {props.text}
            </span>
        </NavLink>
    );
}

export default HeaderButton;
