import { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../context/useAuth'
import { getProfile } from '../lib/profileApi'

export default function Profile() {
    const { user, loading, accessToken } = useAuth()
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState('')
    const [failedImage, setFailedImage] = useState(null)

    useEffect(() => {
        if (!user || !accessToken) return

        const controller = new AbortController()

        getProfile(user.id, accessToken, controller.signal)
            .then(data => {
                setProfile(data)
                setError('')
            })
            .catch(err => {
                if (!controller.signal.aborted) setError(err.message)
            })

        return () => controller.abort()
    }, [user?.id, accessToken])

    if (loading || (user && !profile && !error)) {
        return (
            <section className="auth-page">
                <div className="loader" role="status" aria-label="Loading profile" />
            </section>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (error) {
        return (
            <section className="auth-page">
                <p className="auth-error" role="alert">{error}</p>
            </section>
        )
    }

    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
    const initials = `${profile.firstName?.[0] || ''}${profile.lastName?.[0] || ''}`
    const joined = profile.created_at
        ? new Date(profile.created_at).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : 'Unavailable'

    return (
        <section className="auth-page">
            <div className="profile-card profile-enter">
                <div className="profile-heading">
                    <div className="profile-avatar">
                        {profile.imageURL && failedImage !== profile.imageURL ? (
                            <img
                                src={profile.imageURL}
                                alt={fullName || 'Profile'}
                                onError={() => setFailedImage(profile.imageURL)}
                            />
                        ) : (
                            <span>{initials || 'P'}</span>
                        )}
                    </div>

                    <h1>{fullName || profile.nickname || 'My Profile'}</h1>
                    <p className="profile-nickname">
                        {profile.nickname ? `@${profile.nickname}` : 'Pixora member'}
                    </p>
                </div>

                <dl className="profile-details">
                    <div>
                        <dt>First name</dt>
                        <dd>{profile.firstName || 'Not provided'}</dd>
                    </div>
                    <div>
                        <dt>Last name</dt>
                        <dd>{profile.lastName || 'Not provided'}</dd>
                    </div>
                    <div>
                        <dt>Nickname</dt>
                        <dd>{profile.nickname || 'Not provided'}</dd>
                    </div>
                    <div>
                        <dt>Email</dt>
                        <dd>{profile.email || user.email}</dd>
                    </div>
                    <div>
                        <dt>Member since</dt>
                        <dd>{joined}</dd>
                    </div>
                    <div>
                        <dt>Profile ID</dt>
                        <dd>{profile.id}</dd>
                    </div>
                </dl>
            </div>
        </section>
    )
}