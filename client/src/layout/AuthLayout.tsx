import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main className="bg-slate-950 min-h-screen flex items-center justify-center px-4">
            <div className="bg-neutral-100 max-w-md w-full shadow-xl rounded-xl p-8">
                <h1 className="text-4xl font-playfair italic font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-800 bg-clip-text text-transparent">
                    Free</span><span className="text-slate-600">Manage</span>
                </h1>

                <Outlet />
            </div>
        </main>
    )
}

export default AuthLayout