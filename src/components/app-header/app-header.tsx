import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";
import { HeaderButton } from "./app-header-button/app-header-button";
import { useAppSelector } from "../../hooks/useAppSelector";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
    const name = useAppSelector((state) => state.auth.user?.name);

    return (
        <header className={style.header}>
            <nav className={style.navigator}>
                <div>
                    <HeaderButton
                        text="Конструктор"
                        icon="burger"
                        type="secondary"
                        path="/"
                    />
                    <HeaderButton
                        text="Лента заказов"
                        icon="list"
                        type="secondary"
                        path="/feed"
                    />
                </div>

                <div>
                    <HeaderButton
                        text={name ? name : `Личный кабинет`}
                        icon="profile"
                        type="secondary"
                        path="/profile"
                    />
                </div>
            </nav>
            <NavLink to="/">
                <Logo className={style.logo} />
            </NavLink>
        </header>
    );
}
