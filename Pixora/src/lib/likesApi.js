const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export async function getPhotoLikes(photoId, signal) {
    const response = await fetch(
        `${url}/rest/v1/photo_likes?photo_id=eq.${encodeURIComponent(photoId)}&select=user_id`,
        {
            headers: { apikey: key },
            signal,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Could not load likes.')
    }

    return data
}

export async function setPhotoLike(photoId, liked, accessToken) {
    if (!accessToken) {
        throw new Error('You must log in to like a photo.')
    }

    const response = await fetch(`${url}/rest/v1/rpc/set_photo_like`, {
        method: 'POST',
        headers: {
            apikey: key,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            p_photo_id: photoId,
            p_liked: liked,
        }),
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Could not update your like.')
    }
}