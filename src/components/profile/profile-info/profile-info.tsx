import { UserData } from "../../../service/types";
import s from "../profile.module.css";
import {
    PasswordInput,
    EmailInput,
    Input,
    Button,
    CloseIcon,
    CheckMarkIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {  useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppSelector";

import {
    updateUserData,
} from "../../../redux/actions/auth";

const ProfileInfo: React.FC = () => {
    const dispatch = useAppDispatch();
    const userData = useAppSelector((state) => state.auth.user);

    const [errorDispatch, setErrorDispatch] = useState("");

    const newUserDataInitState: UserData = {
        name: userData?.name,
        email: userData?.email,
        password: localStorage.cosmicSecret
            ? atob(localStorage.cosmicSecret)
            : "",
    };
    const [newUserData, setNewUserData] =
        useState<UserData>(newUserDataInitState);

    const [isEditData, setIsEditData] = useState(false);

    const onChangeHolder = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isEditData) {
            setIsEditData(true);
        }
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const resetNewData = () => {
        setNewUserData(newUserDataInitState);
        setIsEditData(false);
    };

    const updateNewUserData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (window.confirm("сменить данные?")) {
            dispatch(
                updateUserData(localStorage.accessToken, newUserData)
            ).then((res) => {
                if (res.success) {
                    console.log("updateUserData DONE");
                    setIsEditData(false);

                    setNewUserData({
                        name: res.user?.name,
                        email: res.user?.email,
                        password: localStorage.cosmicSecret
                            ? atob(localStorage.cosmicSecret)
                            : "",
                    });
                } else {
                    console.error("updateUserData ERROR");
                    setErrorDispatch(res.message ? res.message : res.status);
                }

                console.dir(res);
            });
        } else {
            resetNewData();
        }
    };
    // fix UI bug for pointEvents
    const pointEventHandler = (e: React.PointerEvent<HTMLInputElement>) => {
        console.dir(e);
    };

    return (
        <form onSubmit={updateNewUserData} className={s.form}>
            <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChangeHolder}
                value={newUserData?.name ? newUserData.name : ""}
                name={"name"}
                extraClass={s.input}
                onPointerEnterCapture={pointEventHandler}
                onPointerLeaveCapture={pointEventHandler}
                icon={"EditIcon"}
            />
            <EmailInput
                onChange={onChangeHolder}
                value={newUserData?.email ? newUserData.email : ""}
                name={"email"}
                placeholder="Логин"
                isIcon={true}
                extraClass={s.input}
            />
            <PasswordInput
                onChange={onChangeHolder}
                value={newUserData?.password ? newUserData.password : ""}
                name={"password"}
                extraClass={s.input}
                icon={"EditIcon"}
                autoComplete={"true"}
            />

            {errorDispatch && <p className={s.notice}>{errorDispatch}</p>}

            {isEditData && (
                <div className={s.row}>
                    <Button
                        extraClass={s.btn}
                        htmlType="button"
                        type="primary"
                        size="large"
                        onClick={resetNewData}
                    >
                        Отмена <CloseIcon type="primary" />
                    </Button>
                    <Button
                        extraClass={s.btn}
                        htmlType="submit"
                        type="primary"
                        size="large"
                    >
                        Сохранить <CheckMarkIcon type="primary" />
                    </Button>
                </div>
            )}
        </form>
    );
};

export default ProfileInfo;
