const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

async function readResponse(response) {
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(
            data.msg ||
            data.message ||
            data.error_description ||
            data.error ||
            `Request failed (${response.status})`
        )
    }

    return data
}

async function request(path, body) {
    const response = await fetch(`${url}/auth/v1/${path}`, {
        method: 'POST',
        headers: {
            apikey: key,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })

    return readResponse(response)
}

export function login(email, password) {
    return request('token?grant_type=password', { email, password })
}

export function refreshSession(refreshToken) {
    return request('token?grant_type=refresh_token', {
        refresh_token: refreshToken,
    })
}

export async function signOut(accessToken) {
    const response = await fetch(`${url}/auth/v1/logout?scope=local`, {
        method: 'POST',
        headers: {
            apikey: key,
            Authorization: `Bearer ${accessToken}`,
        },
    })

    await readResponse(response)
}

export function register(email, password, profile) {
    return request('signup', {
        email,
        password,
        data: profile,
    })
}