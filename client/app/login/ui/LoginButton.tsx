import { useFormStatus } from "react-dom"

export function LoginButton() {
    const {pending} = useFormStatus()

    return (
        <button 
            aria-disabled={pending}
            type="submit"
            className="w-3/4 h-12 bg-blue-500 rounded-lg mt-4 text-white"
        >
            {pending ? "Loading..." : "Login"}
        </button>
    )
}