import {
    PasswordInput,
    Input,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { resetPassword } from "../redux/actions/auth";

import Loader from "../ui/loader";

type TResetForm = {
    token: string;
    password: string;
};

export default function ResetPassword() {
    const dispatch = useAppDispatch();

    const [form, setValue] = useState<TResetForm>({ token: "", password: "" });

    const [errorAuth, setErrorAuth] = useState("");
    const [isRequest, setIsRequest] = useState(false);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const ResetPasswordHolder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsRequest(true);
        dispatch(resetPassword(form)).then((res) => {
            if (res.success) {
                navigate("/login");
            } else {
                setErrorAuth("При запросе на сброс пароля произошла ошибка");
            }

            setIsRequest(false);
        });
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    const navigate = useNavigate();
    const successAuth = useAppSelector((state) => state.auth.success);

    useEffect(() => {
        if (!sessionStorage.sendedRestoreMessage) {
            navigate("/forgot-password");
        } else if (successAuth) {
            navigate("/");
        }
    });

    return (
        <div className={s.wrapper}>
            <form onSubmit={ResetPasswordHolder} className={s.form}>
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
                    placeholder={"Код для восстановления пароля из письма"}
                    onChange={onChangeHolder}
                    value={form.token}
                    name={"token"}
                    extraClass={s.input}
                    onPointerEnterCapture={pointEventHandler}
                    onPointerLeaveCapture={pointEventHandler}
                />

                {errorAuth && <p className={s.notice}>{errorAuth}</p>}

                <Button
                    extraClass={s.btn}
                    htmlType="submit"
                    type="primary"
                    size="large"
                >
                    {isRequest ? <Loader /> : `Сохранить`}
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
