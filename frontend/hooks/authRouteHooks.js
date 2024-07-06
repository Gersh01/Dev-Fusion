import {  Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () =>{
    const navigate = useNavigate();
    const auth = useSelector((state) => state.user)

    return(
        auth ? <Outlet/> :navigate('/login')
    )
}
PrivateRoutes();