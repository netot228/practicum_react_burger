import {
    PasswordInput,
    EmailInput,
    Button,
    Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { UserData } from "../utils/types";

import s from "./pages.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useAppSelector";
import { regNewUser } from "..//services/actions/auth";

import { REGISTER_USER_SUCCESS } from "../services/actions/auth";

import Loader from "../ui/loader";

function RegistrationForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const successAuth = useAppSelector((state) => state.auth.success);
    const requestRegister = useAppSelector(
        (state) => state.auth.requestRegister
    );
    
    const [form, setValue] = useState({ name: "", email: "", password: "" });
    const [errorAuth, setErrorAuth] = useState("");

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (errorAuth) {
            setErrorAuth("");
        }
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const RegistrationFormHolder = () => {
        dispatch(regNewUser(form))
        .then(res=>{
            if(res.success){
                navigate("/profile");
            } else {
                setErrorAuth(res.message);
            }
        })
    };

    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
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
                    htmlType="button"
                    type="primary"
                    size="large"
                    onClick={RegistrationFormHolder}
                >
                    Зарегистрироваться{requestRegister ? <Loader /> : `Войти`}
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
