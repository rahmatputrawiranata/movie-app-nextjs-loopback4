'use client'

import { loginAction } from "@/app/actions/login"
import { useFormState } from "react-dom"
import { LoginButton } from "./LoginButton"

export function LoginForm() {
    const [state, action] = useFormState(loginAction, undefined)

    return (
        <form action={action} className="w-full flex flex-col items-center">
            <div className="flex flex-col w-3/4 ">
                <input id="name" name="username" placeholder="Username" className="h-12 border-2 border-gray-300 rounded-lg mt-4 p-1 text-black "/>
                {state?.errors?.username && <p className="text-red-500 text-xs font-medium">{state.errors.username}</p>}
            </div>
            
            <div className="flex flex-col w-3/4 ">
                <input id="password" name="password" placeholder="password" className="h-12 border-2 border-gray-300 rounded-lg mt-4 p-1 text-black "/>
                {state?.errors?.password && <p className="text-red-500 text-xs font-medium">{state.errors.password}</p>}
            </div>
            <LoginButton />
        </form>
    )
}