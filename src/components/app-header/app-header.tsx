import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css";

import HeaderButton from "./app-header-button/app-header-button";

function AppHeader() {
    return (
        <header className={style.header}>
            <nav className={style.navigator}>
                <div>
                    <HeaderButton
                        text="Конструктор"
                        icon="burger"
                        type="primary"
                    />
                    <HeaderButton
                        text="Лента заказов"
                        icon="list"
                        type="secondary"
                    />
                </div>

                <div>
                    <HeaderButton
                        text="Личный кабинет"
                        icon="profile"
                        type="secondary"
                    />
                </div>
            </nav>
            <Logo className={style.logo} />
        </header>
    );
}

export default AppHeader;
