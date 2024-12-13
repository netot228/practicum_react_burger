import {
    PasswordInput,
    EmailInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { UserData } from "../utils/types";

import s from "./pages.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { registerRequest } from "..//services/actions/auth";

function RegistrationForm() {
    const dispatch = useAppDispatch();

    const [form, setValue] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const RegistrationFormHolder = () => {
        dispatch(registerRequest(form));
        // navigate("/login");
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    return (
        <div className={s.wrapper}>
            <form className={s.form}>
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

                {/* <Input
                    type={"text"}
                    placeholder={"Имя"}
                    onChange={onChangeHolder}
                    value={form.name}
                    name={"name"}
                    error={false}
                    errorText={""}
                    size={"default"}
                    icon={"EditIcon"}
                /> */}

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

                <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={RegistrationFormHolder}
                >
                    Зарегистрироваться
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

export default RegistrationForm;
