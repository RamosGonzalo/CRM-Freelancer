import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login"
import Registro from "../pages/Registro"
import Panel from "../pages/Panel"

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                
                {/* Ruta protegida */}
                <Route path="/panel" element={<Panel />} />
                
                {/* Redirecciona a /login por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter