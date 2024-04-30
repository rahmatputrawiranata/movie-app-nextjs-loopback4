export default async function handler() {
    const response = await fetch("http://localhost:3001/ping")
    console.log(response)

    return response
}