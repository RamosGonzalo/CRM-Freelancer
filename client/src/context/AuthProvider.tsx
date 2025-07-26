import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { Usuario } from "./AuthContext";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<Usuario | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const usuario = JSON.parse(atob(token.split(".")[1]));
        setAuth({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider
