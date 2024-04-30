'use client'

import { LoginForm } from "./ui/LoginForm"

export default function LoginPage() {

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full md:w-1/2 h-full md:h-1/2 bg-gray-200 rounded-lg flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-black">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
    
}