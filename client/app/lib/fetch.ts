import { getSession, removeSession } from "./session"

export async function fetchWrapper({
    path,
    method,
    body,
    query
}: {
    path: string,
    method: string,
    body?: any,
    query?: any
}) {

    const session = await getSession()
    const url = new URL(`http://localhost:3001${path}`)
    if(query) url.search = new URLSearchParams(query).toString()
    const response = await fetch(url.toString(), {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        },
        body: body ? JSON.stringify(body) : undefined
    })

    if(response.status === 200) {
        return response.json()
    }else if(response.status === 401) {
        await removeSession()
    }
}