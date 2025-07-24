import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RutaProtegida = () => {
    const { auth } = useContext(AuthContext)

    if (auth === null || !auth.id) 
    {
        return <Navigate to="/" />;
    }

    return <Outlet />
}

export default RutaProtegida