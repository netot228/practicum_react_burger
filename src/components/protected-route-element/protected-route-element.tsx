import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useAppSelector";
import { useEffect, useState } from "react";

import { LOGIN_USER } from "../../services/actions/auth";

type ProtectedElementProp = {
    element: React.ReactElement;
};

function ProtectedRouteElement(props: ProtectedElementProp) {
    const isUserDetected = useAppSelector((state) => state.auth.success);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isUserDetected && localStorage.userData) {
            const userData = JSON.parse(localStorage.userData);
            // console.dir(userData);
            dispatch({
                type: LOGIN_USER,
                payload: userData,
            });
        } else if (!isUserDetected) {
            navigate("/login");
        }
    });

    if (!isUserDetected) {
        return null;
    }

    return props.element;
}

export default ProtectedRouteElement;
