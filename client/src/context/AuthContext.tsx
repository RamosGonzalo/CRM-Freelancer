import { createContext } from "react";

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
}

interface AuthContextType {
    auth: Usuario | null;
    setAuth: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)
