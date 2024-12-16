import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useState } from 'react';

type ProtectedElementProp = {
    element: React.ReactElement
}

function ProtectedRouteElement(props:ProtectedElementProp){
    
    // debugger;
    const successAuth = useAppSelector(state=>state.auth.success);
    
    const navigate = useNavigate();

    useEffect(()=>{
        
        if(!successAuth){
            navigate('/login');
        }
    })

    if(!successAuth){
        return null;
    }
    
    return props.element
}

export default ProtectedRouteElement;