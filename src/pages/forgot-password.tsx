import {
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { sendMailToResetPassword } from "../services/actions/auth";

import Loader from "../ui/loader";

function ForgotPass() {
    const dispatch = useAppDispatch();

    const successAuth = useAppSelector((state) => state.auth.success);

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const [errorAuth, setErrorAuth] = useState("");
    const [isRequest, setIsRequest] = useState(false);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const ForgotPassHolder = () => {
        setIsRequest(true);
        dispatch(sendMailToResetPassword(email)).then((res) => {
            if (res.success) {
                sessionStorage.sendedRestoreMessage = 'done';
                navigate("/reset-password");
            } else {
                setErrorAuth("При запросе на сброс пароля произошла ошибка");
            }

            setIsRequest(false);
        });
    };

    useEffect(() => {
        if (successAuth) {
            navigate("/");
        }
    });

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

                {errorAuth && <p className={s.notice}>{errorAuth}</p>}

                <Button
                    extraClass={s.btn}
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={ForgotPassHolder}
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

export default ForgotPass;
