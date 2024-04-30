import { NextResponse } from "next/server";
import { FormState, LoginSchema } from "../lib/definitions";
import { setSession } from "../lib/session";
import { redirect } from "next/navigation";

export async function loginAction(state: FormState, formData: FormData) {
    const validatedFields = LoginSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password")
    })

    if(!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const res = await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify(validatedFields.data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    

    if(res.status !== 200) {

        const resp = await res.json() as {
            message: string,
            errors: {
                username?: string[],
                password?: string[]
            }
        
        }
        return {
            errors: {
                username: resp.errors.username,
                password: resp.errors.password
            }
        }
    }else{
        const resp = await res.json() as {
            response : {
                token: string
            }
        }
        await setSession(resp.response.token)
        redirect("/")
    }
    
}

