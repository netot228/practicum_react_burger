import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

import HeaderButton from "./app-header-button/app-header-button";

import { useAppSelector } from "../../hooks/useAppSelector";

function AppHeader() {

    const user = useAppSelector(state=>state.auth.user);

    return (
        <header className={style.header}>
            <nav className={style.navigator}>
                <div>
                    <HeaderButton
                        text="Конструктор"
                        icon="burger"
                        type="primary"
                        path="/"
                    />
                    <HeaderButton
                        text="Лента заказов"
                        icon="list"
                        type="secondary"
                        path="/order-feed"
                    />
                </div>

                <div>
                    <HeaderButton
                        text="Личный кабинет"
                        icon="profile"
                        type="secondary"
                        path="/profile"
                    />
                </div>
            </nav>
            <Logo className={style.logo} />
        </header>
    );
}

export default AppHeader;
