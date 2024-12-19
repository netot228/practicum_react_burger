import s from "./profile.module.css";

import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { resetToken, logOut } from "../../services/actions/auth";

function Profile() {
    const dispatch = useAppDispatch();

    const userData = useAppSelector((state) => state.auth.user);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    useEffect(() => {
        const dateTime = new Date().getTime();
        console.dir(dateTime);

        if (
            localStorage.refreshToken &&
            (!localStorage.tokenTimeout ||
                localStorage.tokenTimeout < dateTime - 60 * 60 * 15)
        ) {
            dispatch(resetToken(localStorage.refreshToken));
            // dispatch(resetToken(localStorage.accessToken));
        }
    });

    const logOut = () => {
        dispatch(logOut);
    };

    return (
        <div className={s.profile}>
            <nav className={s.navigation}>
                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/profile/orders"
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                >
                    История заказов
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                    onClick={logOut}
                >
                    Выход
                </NavLink>
            </nav>
            <section className={s.form}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChangeHolder}
                    value={userData?.name ? userData.name : ""}
                    name={"name"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                    icon={"EditIcon"}
                />
                <EmailInput
                    onChange={onChangeHolder}
                    value={userData?.email ? userData.email : ""}
                    name={"email"}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass={s.input}
                />
                <PasswordInput
                    onChange={onChangeHolder}
                    value={""}
                    name={"password"}
                    extraClass={s.input}
                    icon={"EditIcon"}
                />

                {/* <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={signInHolder}
                >
                    Войти
                </Button> */}

                {/* <div className={s.option}>
                    <span>Вы — новый пользователь?</span>
                    <Link to="/register" className={s.link}>
                        Зарегистрироваться
                    </Link>
                </div>

                <div className={s.option}>
                    <span>Забыли пароль?</span>
                    <Link to="/forgot-password" className={s.link}>
                        Восстановить пароль
                    </Link>
                </div> */}
            </section>
        </div>
    );
}

export default Profile;
