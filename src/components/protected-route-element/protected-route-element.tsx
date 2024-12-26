import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/useAppSelector";
import { useEffect } from "react";

import { LOGIN_USER } from "../../services/actions/auth";

type ProtectedElementProp = {
    element: React.ReactElement;
};

function ProtectedRouteElement(props: ProtectedElementProp) {
    const isUserDetected = useAppSelector((state) => state.auth.success);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    console.log('location')
    console.dir(location);

    useEffect(() => {
        if (!isUserDetected && localStorage.userData) {
            const userData = JSON.parse(localStorage.userData);
            dispatch({
                type: LOGIN_USER,
                payload: { user: userData, success: true },
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
