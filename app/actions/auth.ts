'use server'

export async function loginAction(formData: FormData) {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    const validUsername = process.env.ADMIN_USERNAME
    const validPassword = process.env.ADMIN_PASSWORD

    if (!validUsername || !validPassword) {
        console.error("Missing ADMIN_USERNAME or ADMIN_PASSWORD env variables")
        return false
    }

    if (username === validUsername && password === validPassword) {
        return true
    }

    return false
}
