import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "../app-header.module.css";

type BtnPops = {
    type: "secondary" | "primary" | "error" | "success" | "disabled";
    icon?: string;
    text?: string;
    className?: string;
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
        <button className={style.button}>
            {props.icon && Icon}
            <span
                className={`text text_type_main-default ${style[props.type]}`}
            >
                {props.text}
            </span>
        </button>
    );
}

export default HeaderButton;
