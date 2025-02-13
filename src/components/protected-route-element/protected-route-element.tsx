import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useAppSelector";
import { useEffect } from "react";

import { LOGIN_USER } from "../../redux/actions/auth";

type ProtectedElementProp = {
    element: React.ReactElement;
    anonymOnlyEntrance?: boolean;
};

export default function ProtectedRouteElement(props: ProtectedElementProp) {
    const isUserDetected = useAppSelector((state) => state.auth.success);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from || "/";

    const anonymOnlyEntrance = props.anonymOnlyEntrance || false;

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (anonymOnlyEntrance && isUserDetected) {
            navigate(from);
        }

        if (!anonymOnlyEntrance && !isUserDetected) {
            if (localStorage.userData) {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        user: JSON.parse(localStorage.userData),
                        success: true,
                    },
                });
            } else {
                navigate("/login", { state: { from: location } });
            }
        }
    }, [isUserDetected]);

    if (!isUserDetected && !anonymOnlyEntrance) {
        return null;
    }

    return props.element;
}
