import { useNavigate, useLocation, Navigate } from "react-router-dom";
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
    const from = location.state?.from || "/";

    const anonymOnlyEntrance = props.anonymOnlyEntrance || false;

    // const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isUserDetected && localStorage.userData) {
            const userData = JSON.parse(localStorage.userData);
            dispatch({
                type: LOGIN_USER,
                payload: { user: userData, success: true },
            });
            // } else if (!isUserDetected && !anonymOnlyEntrance) {
            //     navigate("/login", {state:{ from: location });
            // } else if (anonymOnlyEntrance && isUserDetected) {
            //     navigate(from);
        }
    });

    if (anonymOnlyEntrance && isUserDetected) {
        return <Navigate to={from} />;
    }

    if (!anonymOnlyEntrance && !isUserDetected) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (!isUserDetected && !anonymOnlyEntrance) {
        return null;
    }

    return props.element;
}
