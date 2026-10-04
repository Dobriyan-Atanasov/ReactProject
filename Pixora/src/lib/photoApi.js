const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export async function getPhotos(signal) {
    const response = await fetch(
        `${url}/rest/v1/photos?select=*&order=id.asc`,
        {
            headers: {
                apikey: key,
            },
            signal,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Could not load the photos.')
    }

    return data
}

export async function getPhoto(id, signal) {
    const response = await fetch(
        `${url}/rest/v1/photos?id=eq.${encodeURIComponent(id)}&select=*&limit=1`,
        {
            headers: { apikey: key },
            signal,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Could not load the photo.')
    }

    if (!data.length) {
        throw new Error('Photo not found.')
    }

    return data[0]
}

export async function getPhotoAuthor(authId, signal) {
    const response = await fetch(
        `${url}/rest/v1/users?auth_id=eq.${encodeURIComponent(authId)}&select=firstName,lastName,nickname&limit=1`,
        {
            headers: { apikey: key },
            signal,
        }
    )

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || 'Could not load the author.')
    }

    return data[0] || null
}

async function callPhotoFunction(functionName, body, accessToken) {
    if (!accessToken) {
        throw new Error('You must log in first.')
    }

    const response = await fetch(
        `${url}/rest/v1/rpc/${functionName}`,
        {
            method: 'POST',
            headers: {
                apikey: key,
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }
    )

    const text = await response.text()

    let data = null

    if (text) {
        try {
            data = JSON.parse(text)
        } catch {
            throw new Error('The server returned an unexpected response.')
        }
    }

    if (!response.ok) {
        throw new Error(data?.message || 'Could not save your changes.')
    }

    return data
}

export async function createPhoto(values, accessToken) {
    const data = await callPhotoFunction(
        'save_photo',
        {
            p_title: values.title,
            p_category: values.category,
            p_description: values.description,
            p_image_url: values.image_url,
            p_id: null,
        },
        accessToken
    )

    if (!data?.[0]) {
        throw new Error('The server did not return the new photo.')
    }

    return data[0]
}

export async function updatePhoto(id, values, accessToken) {
    const data = await callPhotoFunction(
        'save_photo',
        {
            p_title: values.title,
            p_category: values.category,
            p_description: values.description,
            p_image_url: values.image_url,
            p_id: id,
        },
        accessToken
    )

    if (!data?.[0]) {
        throw new Error('The server did not return the updated photo.')
    }

    return data[0]
}

export async function deletePhoto(id, accessToken) {
    await callPhotoFunction(
        'delete_photo',
        { p_id: id },
        accessToken
    )
}