'use server'

import { cookies } from "next/headers"

export async function removeSession() {
    cookies().set('session', '', {expires: new Date(0), httpOnly: true})
}

export async function getSession() {
    const session = cookies().get('session')
    return session?.value
}

export async  function setSession(session: string) {
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)
    cookies().set('session', session, {expires, httpOnly: true})
}