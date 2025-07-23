import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login"
import Registro from "../pages/Registro"
import Panel from "../pages/Panel"
import AuthLayout from "../layout/AuthLayout";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas publicas */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                </Route>
                
                {/* Ruta protegida */}
                <Route path="/panel" element={<Panel />} />
                
                {/* Ruta por defecto */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter