import {
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function ResetPassword() {
    const [form, setValue] = useState({ code: "", password: "" });

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const ResetPasswordHolder = () => {};

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    return (
        <div className={s.wrapper}>
            <section className={s.form}>
                <h1 className={`text_type_main-medium ${s.title}`}>Вход</h1>
                <PasswordInput
                    placeholder={"Введите новый пароль"}
                    onChange={onChangeHolder}
                    value={form.password}
                    name={"password"}
                    extraClass={s.input}
                />
                <Input
                    type={"text"}
                    placeholder={""}
                    onChange={onChangeHolder}
                    value={form.code}
                    name={"name"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                />

                <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={ResetPasswordHolder}
                >
                    Сохранить
                </Button>

                <div className={s.option}>
                    <span>Вспомнили пароль?</span>
                    <Link to="/login" className={s.link}>
                        Войти
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default ResetPassword;
