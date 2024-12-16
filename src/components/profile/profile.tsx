import s from "../../pages/pages.module.css";

import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

function Profile() {
    const z = useAppSelector((state) => state.auth.user);

    console.dir(z);

    const [userData, setUserData] = useState({
        email: "",
        password: "",
        name: "",
    });

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    return (
        <div className={s.wrapper}>
            <section className={s.form}>
                <h1 className={`text_type_main-medium ${s.title}`}>Вход</h1>
                <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChangeHolder}
                    value={userData.name}
                    name={"name"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                />
                <EmailInput
                    onChange={onChangeHolder}
                    value={userData.email}
                    name={"email"}
                    placeholder="Логин"
                    isIcon={false}
                    extraClass={s.input}
                />
                <PasswordInput
                    onChange={onChangeHolder}
                    value={userData.password}
                    name={"password"}
                    extraClass={s.input}
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
