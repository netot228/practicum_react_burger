import {
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppSelector";
import { sendMailToResetPassword } from "../services/actions/auth";

import Loader from "../ui/loader";

export default function ForgotPass() {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    const [errorAuth, setErrorAuth] = useState<string>("");
    const [isRequest, setIsRequest] = useState<boolean>(false);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const ForgotPassHolder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsRequest(true);
        dispatch(sendMailToResetPassword(email)).then((res) => {
            if (res.success) {
                sessionStorage.sendedRestoreMessage = "done";
                navigate("/reset-password");
            } else {
                setErrorAuth("При запросе на сброс пароля произошла ошибка");
            }

            setIsRequest(false);
        });
    };

    return (
        <div className={s.wrapper}>
            <form onSubmit={ForgotPassHolder} className={s.form}>
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

                {errorAuth && <p className={s.notice}>{errorAuth}</p>}

                <Button
                    extraClass={s.btn}
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                    {isRequest ? <Loader /> : `Восстановить`}
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
