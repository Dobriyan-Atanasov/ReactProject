const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export async function getProfile(authId, accessToken, signal) {
    const response = await fetch(
        `${url}/rest/v1/users?auth_id=eq.${encodeURIComponent(authId)}&select=id,created_at,firstName,lastName,nickname,email,imageURL&limit=1`,
        {
            headers: {
                apikey: key,
                Authorization: `Bearer ${accessToken}`,
            },
            signal,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Could not load your profile.')
    }

    if (!data.length) {
        throw new Error('Your profile could not be found.')
    }

    return data[0]
}