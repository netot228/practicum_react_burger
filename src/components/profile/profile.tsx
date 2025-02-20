import s from "./profile.module.css";
import { useEffect } from "react";
import { Routes, Route, NavLink } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { refreshToken, logOut } from "../../redux/actions/auth";

import ProfileInfo from "./profile-info/profile-info";
import ProfileOrders from "./profile-orders/profile-orders";

import { Page404 } from "../../pages";

import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CLOSE,
} from "../../redux/actions/user-feed";

import FeedDetails from "../feed/feed-details/feed-details";

export default function Profile() {
    const dispatch = useAppDispatch();

    const accessToken = useAppSelector((state) => state.auth.accessToken);
    const isUserDetected = useAppSelector((state) => state.auth.success);

    useEffect(() => {
        if (isUserDetected) {
            const timeOut = new Date().getTime() - 15 * 60 * 1000;

            if (
                localStorage.tokenTimeout &&
                Number(localStorage.tokenTimeout) < timeOut
            ) {
                // console.log("___PROFILE token просрочен рефреш");
                dispatch(refreshToken(localStorage.refreshToken)).then(
                    (res) => {
                        if (res.success) {
                            // console.log("___PROFILE refreshToken DONE");
                            dispatch({ type: WS_USER_FEED_CONNECT });
                        } else {
                            // console.log("___PROFILE refreshToken ERROR");
                        }
                        console.dir(res);
                    }
                );
            } else if (localStorage.accessToken) {
                dispatch({ type: WS_USER_FEED_CONNECT });
            }
        }

        return () => {
            dispatch({ type: WS_USER_FEED_CLOSE });
        };
    }, [isUserDetected, accessToken]);

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
                <Route path="orders/:id" element={<FeedDetails />} />
                <Route path="orders" element={<ProfileOrders />} />
                <Route path="" element={<ProfileInfo />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
