import {
    PasswordInput,
    EmailInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { regNewUser } from "..//services/actions/auth";

import Loader from "../ui/loader";

export default function RegistrationForm() {
    const dispatch = useAppDispatch();
    const requestRegister = useAppSelector(
        (state) => state.auth.requestRegister
    );

    const [form, setValue] = useState<{name: string, email: string, password: string }>({ name: "", email: "", password: "" });
    
    const [errorAuth, setErrorAuth] = useState<string>("");

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorAuth) {
            setErrorAuth("");
        }
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const RegistrationFormHolder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(regNewUser(form)).catch((err) => {
            setErrorAuth(err);
        });
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    return (
        <div className={s.wrapper}>
            <form onSubmit={RegistrationFormHolder} className={s.form}>
                <h1 className={`text_type_main-medium ${s.title}`}>
                    Регистрация
                </h1>
                <Input
                    type={"text"}
                    placeholder="Имя"
                    onChange={onChangeHolder}
                    value={form.name}
                    name={"name"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                />
                <EmailInput
                    onChange={onChangeHolder}
                    value={form.email}
                    name={"email"}
                    placeholder="E-mail"
                    isIcon={false}
                    extraClass={s.input}
                />
                <PasswordInput
                    onChange={onChangeHolder}
                    value={form.password}
                    name={"password"}
                    extraClass={s.input}
                    autoComplete="on"
                />

                {errorAuth && <p className={s.notice}>{errorAuth}</p>}

                <Button
                    extraClass={s.btn}
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                    {requestRegister ? <Loader /> : `Зарегистрироваться`}
                </Button>

                <div className={s.option}>
                    <span>Уже зарегистрированы?</span>
                    <Link to="/login" className={s.link}>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
}


