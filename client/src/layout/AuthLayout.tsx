import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main className="bg-gray-900 min-h-screen flex items-center justify-center px-4">
            <div className="bg-neutral-200 max-w-md w-full shadow-md rounded-lg p-8">
                <h1 className="text-3xl italic font-bold text-center text-blue-800 mb-6">
                    FreeManage
                </h1>

                {/* Aqui se va a renderizar la pagina hija login, registro, panel */}
                <Outlet />
            </div>
        </main>
    )
}

export default AuthLayout