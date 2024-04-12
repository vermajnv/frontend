import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const PrivateRoutes = ({isAuthenticated, children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/auth')
        }  
    }, [isAuthenticated, navigate]);
    return isAuthenticated ? <Outlet></Outlet> : null
}

export default PrivateRoutes