import { useCallback, useEffect, useState } from 'react'
import { refreshSession, signOut } from '../lib/authApi'
import { AuthContext } from './AuthContext'

const STORAGE_KEY = 'pixora-refresh-token'

export default function AuthProvider({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    const saveSession = useCallback((data) => {
        const nextSession = {
            user: data.user,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresAt: Date.now() + data.expires_in * 1000,
        }

        localStorage.setItem(STORAGE_KEY, nextSession.refreshToken)
        setSession(nextSession)
    }, [])

    const clearSession = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY)
        setSession(null)
    }, [])

    // Restore the login after a page refresh.
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY)

        if (!token) {
            setLoading(false)
            return
        }

        let active = true

        refreshSession(token)
            .then(data => {
                if (active) saveSession(data)
            })
            .catch(() => {
                if (active) clearSession()
            })
            .finally(() => {
                if (active) setLoading(false)
            })

        return () => {
            active = false
        }
    }, [saveSession, clearSession])

    // Renew the access token shortly before it expires.
    useEffect(() => {
        if (!session) return

        const delay = Math.max(0, session.expiresAt - Date.now() - 60_000)

        const timer = setTimeout(async () => {
            try {
                const data = await refreshSession(session.refreshToken)
                saveSession(data)
            } catch {
                clearSession()
            }
        }, delay)

        return () => clearTimeout(timer)
    }, [session, saveSession, clearSession])

    async function logout() {
        try {
            if (session) await signOut(session.accessToken)
        } finally {
            clearSession()
        }
    }

    return (
        <AuthContext.Provider value={{
            user: session?.user ?? null,
            accessToken: session?.accessToken ?? null,
            loading,
            saveSession,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}