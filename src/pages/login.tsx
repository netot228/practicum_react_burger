import {
    PasswordInput,
    EmailInput,
    Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import s from "./pages.module.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { authUser } from "../services/actions/auth";
import { useNavigate } from "react-router-dom";

import Loader from "../ui/loader";

function Login() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const successAuth = useAppSelector((state) => state.auth.success);
    const requestRegister = useAppSelector(
        (state) => state.auth.requestRegister
    );

    console.log("reload Login");

    const [form, setValue] = useState({ email: "", password: "" });

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const [errorAuth, setErrorAuth] = useState("");

    const signInForm = (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(authUser(form)).then((response) => {
            response?.message && setErrorAuth(response.message);
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

                {errorAuth && <p className={s.notice}>{errorAuth}</p>}

                <Button
                    extraClass={s.btn}
                    htmlType="submit"
                    type="primary"
                    size="large"
                    onClick={signInForm}
                >
                    {requestRegister ? <Loader /> : `Войти`}
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

export default Login;
