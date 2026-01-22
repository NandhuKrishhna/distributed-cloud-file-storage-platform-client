import React from "react"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">OOPS! Page Not Found</p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-blue-600/20 transition-all"
            >
                Back To Home
            </button>
        </div>
    )
}
