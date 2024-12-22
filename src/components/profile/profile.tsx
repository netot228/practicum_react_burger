import s from "./profile.module.css";
import { UserData as userType } from "../../utils/types";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
    CloseIcon,
    CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import {
    refreshToken,
    logOut,
    getUserData,
    updateUserData,
    LOGIN_USER,
} from "../../services/actions/auth";

function Profile() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userData = useAppSelector((state) => state.auth.user);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const timeOut = new Date().getTime() - 5 * 60 * 1000;

        if (
            localStorage.tokenTimeout &&
            Number(localStorage.tokenTimeout) > timeOut
        ) {
            console.log("token действителен get userData");

            dispatch(getUserData(localStorage.accessToken)).then((res) => {
                if (res.success) {
                    console.log("getUserData DONE");
                } else {
                    console.log("getUserData ERROR");
                }
                console.dir(res);
            });
        }
    }, [accessToken]);

    const newUserDataInitState = {
        name: userData?.name,
        email: userData?.email,
        password: localStorage.cosmicSecret
            ? atob(localStorage.cosmicSecret)
            : "",
    };
    const [newUserData, setNewUserData] = useState(newUserDataInitState);

    const [isEditData, setIsEditData] = useState(false);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isEditData) {
            setIsEditData(true);
        }
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const resetNewData = () => {
        setNewUserData(newUserDataInitState);
        setIsEditData(false);
    };

    const updateNewUserData = () => {
        dispatch(updateUserData(localStorage.accessToken, newUserData)).then(
            (res) => {
                if (res.success) {
                    console.log("updateUserData DONE");
                    setIsEditData(false);
                    setNewUserData(newUserDataInitState);
                } else {
                    console.log("updateUserData ERROR");
                }
                console.dir(res);
            }
        );
    };

    const logOutHandler = () => {
        dispatch(logOut(localStorage.refreshToken))
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
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
                    onClick={logOutHandler}
                >
                    Выход
                </NavLink>

                <div
                    className={`${s.notice} text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </nav>
            <form className={s.form}>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChangeHolder}
                    value={newUserData?.name ? newUserData.name : ""}
                    name={"name"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                    icon={"EditIcon"}
                />
                <EmailInput
                    onChange={onChangeHolder}
                    value={newUserData?.email ? newUserData.email : ""}
                    name={"email"}
                    placeholder="Логин"
                    isIcon={true}
                    extraClass={s.input}
                />
                <PasswordInput
                    onChange={onChangeHolder}
                    value={newUserData?.password ? newUserData.password : ""}
                    name={"password"}
                    extraClass={s.input}
                    icon={"EditIcon"}
                    autoComplete={"true"}
                />

                {isEditData && (
                    <div className={s.row}>
                        <Button
                            extraClass={s.btn}
                            htmlType="reset"
                            type="primary"
                            size="large"
                            onClick={resetNewData}
                        >
                            Отмена <CloseIcon type="primary" />
                        </Button>
                        <Button
                            extraClass={s.btn}
                            htmlType="button"
                            type="primary"
                            size="large"
                            onClick={updateNewUserData}
                        >
                            Сохранить <CheckMarkIcon type="primary" />
                        </Button>
                    </div>
                )}
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
            </form>
        </div>
    );
}

export default Profile;
