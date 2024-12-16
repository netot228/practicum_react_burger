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
import { sendMailToResetPassword } from "../services/actions/auth";

function ForgotPass() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const ForgotPassHolder = () => {
        dispatch(sendMailToResetPassword(email));
    };

    return (
        <div className={s.wrapper}>
            <form className={s.form}>
                <h1 className={`text_type_main-medium ${s.title}`}>
                    Восстановление пароля
                </h1>

                <EmailInput
                    onChange={onChangeHolder}
                    value={email}
                    name={"email"}
                    placeholder="Укажите e-mail"
                    isIcon={false}
                    extraClass={s.input}
                />

                <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={ForgotPassHolder}
                >
                    Восстановить
                </Button>

                <div className={s.option}>
                    <span>Вспомнили пароль?</span>
                    <Link to="/login" className={s.link}>
                        Войти
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ForgotPass;
