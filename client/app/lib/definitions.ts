import { z } from "zod";

export const LoginSchema = z.object({
    username: z
        .string()
        .regex(/^[a-zA-Z0-9]/, {
            message: "Only alphanumeric characters allowed"
        }),
    password: z
        .string()
        .regex(/^[a-zA-Z0-9]/, {
            message: "Only alphanumeric characters allowed"
        })
})

export type FormState = 
    | {
        errors?: {
            username?: string[],
            password?: string[]
        }
    } | undefined