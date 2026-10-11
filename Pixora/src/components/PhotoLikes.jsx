import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../context/useAuth'
import { getPhotoLikes, setPhotoLike } from '../lib/likesApi'

export default function PhotoLikes({ photoId }) {
    const { user, accessToken, loading } = useAuth()
    const [likes, setLikes] = useState(null)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const hasLiked = likes?.some(like => like.user_id === user?.id) ?? false

    useEffect(() => {
        const controller = new AbortController()

        getPhotoLikes(photoId, controller.signal)
            .then(data => setLikes(data))
            .catch(err => {
                if (!controller.signal.aborted) setError(err.message)
            })

        return () => controller.abort()
    }, [photoId])

    async function handleLike() {
        if (!user || !likes || submitting) return

        setSubmitting(true)
        setError('')

        try {
            await setPhotoLike(photoId, !hasLiked, accessToken)

            setLikes(current =>
                hasLiked
                    ? current.filter(like => like.user_id !== user.id)
                    : [...current, { user_id: user.id }]
            )
        } catch (err) {
            setError(err.message || 'Could not update your like.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div>
            <p role="status">
                {likes === null
                    ? error ? 'Likes unavailable' : 'Loading likes…'
                    : `${likes.length} ${likes.length === 1 ? 'like' : 'likes'}`}
            </p>

            {!loading && (
                user ? (
                    <button
                        type="button"
                        className="photo-secondary-button"
                        onClick={handleLike}
                        disabled={likes === null || submitting}
                        aria-pressed={hasLiked}
                    >
                        {submitting ? 'Saving…' : hasLiked ? 'Unlike' : 'Like Photo'}
                    </button>
                ) : (
                    <Link to="/login" className="photo-secondary-button">
                        Log in to like
                    </Link>
                )
            )}

            {error && <p className="auth-error" role="alert">{error}</p>}
        </div>
    )
}