import {
    PasswordInput,
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
    const [form, setValue] = useState({ email: "", password: "" });

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();
    };

    const signInHolder = () => {};

    return (
        <div className={s.wrapper}>
            <section className={s.form}>
                <h1 className={s.title}>Вход</h1>
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
                    <Link to="/register" className={s.link}>
                        Восстановить пароль
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default SignIn;
