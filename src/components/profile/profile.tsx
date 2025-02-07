import s from "./profile.module.css";
import { useEffect } from "react";
import {
    Routes,
    Route,
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";

import { refreshToken, logOut, getUserData } from "../../redux/actions/auth";

import ProfileInfo from "./profile-info/profile-info";
import ProfileOrders from "./profile-orders/profile-orders";

import {
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_CLOSE,
} from "../../redux/actions/user-feed";

import { CLEAR_SELECTED_ORDER } from "../../redux/actions/selected-order";

import FeedDetails from "../feed/feed-details/feed-details";

export default function Profile() {
    const dispatch = useAppDispatch();
    const accessToken = useAppSelector((state) => state.auth.accessToken);

    const location = useLocation();
    const background = location.state && location.state.background;
    const navigate = useNavigate();

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

    const { closeModal } = useModal(false);
    const closeModalHandler = () => {
        dispatch({
            type: CLEAR_SELECTED_ORDER,
        });

        if (background?.pathname) {
            navigate(background.pathname);
        } else {
            navigate("/");
        }
        closeModal();
    };

    return (
        <div className={s.profile}>
            <nav className={s.navigation}>
                <NavLink
                    to="/profile/"
                    className={({ isActive }) =>
                        isActive ? s.activelink : s.link
                    }
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/profile/orders"
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

            <Routes location={background || location}>
                {/* <Routes> */}
                <Route path="/orders/:id" element={<FeedDetails />} />
                <Route path="/orders" element={<ProfileOrders />} />
                <Route path="/" element={<ProfileInfo />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/orders/:id"
                        element={
                            <Modal onClose={closeModalHandler} title="">
                                <FeedDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
}
