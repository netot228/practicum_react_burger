import {
    PasswordInput,
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { getUserData } from "../services/actions/auth";

function SignIn() {
    const dispatch = useAppDispatch();

    const [form, setValue] = useState({ email: "", password: "" });

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const signInHolder = () => {
        dispatch(getUserData(form));
    };

    return (
        <div className={s.wrapper}>
            <form className={s.form}>
                <h1 className={`text_type_main-medium ${s.title}`}>Вход</h1>
                <EmailInput
                    onChange={onChangeHolder}
                    value={form.email}
                    name={"email"}
                    placeholder="Логин"
                    isIcon={false}
                    extraClass={s.input}
                />
                <PasswordInput
                    onChange={onChangeHolder}
                    value={form.password}
                    name={"password"}
                    extraClass={s.input}
                    autoComplete={"true"}
                />

                <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={signInHolder}
                >
                    Войти
                </Button>

                <div className={s.option}>
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
                </div>
            </form>
        </div>
    );
}

export default SignIn;
