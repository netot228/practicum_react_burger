import s from "./profile.module.css";
import { useEffect } from "react";
import {
    Routes,
    Route,
    NavLink
} from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { refreshToken, logOut, getUserData } from "../../redux/actions/auth";

import ProfileInfo from "./profile-info/profile-info";
import ProfileOrders from "./profile-orders/profile-orders";

import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CLOSE,
} from "../../redux/actions/user-feed";

export default function Profile() {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    useEffect(() => {
        const timeOut = new Date().getTime() - 5 * 60 * 1000;

        if (
            localStorage.tokenTimeout &&
            Number(localStorage.tokenTimeout) > timeOut
        ) {
            console.log("token действителен get userData");
            dispatch(getUserData(localStorage.accessToken)).then((res) => {
                if (res.message === "jwt expired") {
                    console.dir("jwt expired");
                    console.dir(res);
                    dispatch(refreshToken(localStorage.refreshToken));
                }
            });
        } else {
            console.log("token просрочен рефреш");
            dispatch(refreshToken(localStorage.refreshToken));
        }
    }, [accessToken, dispatch]);

    useEffect(() => {
        dispatch({ type: WS_USER_FEED_CONNECT });

        return () => {
            dispatch({ type: WS_USER_FEED_CLOSE });
        };
    }, []);

    const logOutHandler = () => {
        dispatch(logOut(localStorage.refreshToken));
    };

    
    return (
        <div className={s.profile}>
            <nav className={s.navigation}>
                <NavLink
                    to=""
                    end
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="./orders"
                    end
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                >
                    История заказов
                </NavLink>
                
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                    onClick={logOutHandler}
                >
                    Выход
                </NavLink>

                <div
                    className={`${s.notice} text_type_main-default text_color_inactive`}
                >
                    В этом разделе вы можете изменить свои персональные данные
                </div>
            </nav>

             <Routes>
                <Route path="orders" element={<ProfileOrders />} />
                <Route path="" element={<ProfileInfo />} />
            </Routes>
            
        </div>
    );
}
