import { UserData } from "../../utils/types";
import s from "./profile.module.css";
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
} from "../../services/actions/auth";

export default function Profile() {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    const userData = useAppSelector((state) => state.auth.user);
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const [errorDispatch, setErrorDispatch] = useState("");

    useEffect(() => {
        const timeOut = new Date().getTime() - 5 * 60 * 1000;

        if (
            localStorage.tokenTimeout &&
            Number(localStorage.tokenTimeout) > timeOut
        ) {
            console.log("token действителен get userData");
            dispatch(getUserData(localStorage.accessToken))
            .then(res=>{
                if(res.message==="jwt expired"){
                    dispatch(refreshToken(localStorage.refreshToken));
                }
            });
        } else {
            console.log("token просрочен рефреш");
            dispatch(refreshToken(localStorage.refreshToken));
        }
    }, [accessToken, dispatch]);

    
    const newUserDataInitState: UserData = {
        name: userData?.name,
        email: userData?.email,
        password: localStorage.cosmicSecret
            ? atob(localStorage.cosmicSecret)
            : "",
    };
    const [newUserData, setNewUserData] = useState<UserData>(newUserDataInitState);

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

    const updateNewUserData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (window.confirm("сменить данные?")) {
            dispatch(
                updateUserData(localStorage.accessToken, newUserData)
            ).then((res) => {
                if (res.success) {
                    console.log("updateUserData DONE");
                    setIsEditData(false);

                    setNewUserData({
                        name: res.user?.name,
                        email: res.user?.email,
                        password: localStorage.cosmicSecret
                            ? atob(localStorage.cosmicSecret)
                            : "",
                    });
                } else {
                    console.log("updateUserData ERROR");
                }
                console.dir(res);
            });
        } else {
            resetNewData();
        }
    };

    const logOutHandler = () => {
        dispatch(logOut(localStorage.refreshToken));
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

            <form onSubmit={updateNewUserData} className={s.form}>
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

                {errorDispatch && <p className={s.notice}>{errorDispatch}</p>}

                {isEditData && (
                    <div className={s.row}>
                        <Button
                            extraClass={s.btn}
                            htmlType="button"
                            type="primary"
                            size="large"
                            onClick={resetNewData}
                        >
                            Отмена <CloseIcon type="primary" />
                        </Button>
                        <Button
                            extraClass={s.btn}
                            htmlType="submit"
                            type="primary"
                            size="large"
                        >
                            Сохранить <CheckMarkIcon type="primary" />
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}


