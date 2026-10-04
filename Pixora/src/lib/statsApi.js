const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

async function getCount(table, signal) {
    const response = await fetch(
        `${url}/rest/v1/${table}?select=id&limit=1`,
        {
            method: 'HEAD',
            headers: {
                apikey: key,
                Prefer: 'count=exact',
            },
            signal,
        }
    )

    if (!response.ok) {
        throw new Error(`Could not load the ${table} count.`)
    }

    const total = response.headers
        .get('Content-Range')
        ?.split('/')[1]

    if (!total || !/^\d+$/.test(total)) {
        throw new Error('The server did not return a valid count.')
    }

    return Number(total)
}

export async function getStats(signal) {
    const [projects, users] = await Promise.all([
        getCount('photos', signal),
        getCount('users', signal),
    ])

    return { projects, users }
}