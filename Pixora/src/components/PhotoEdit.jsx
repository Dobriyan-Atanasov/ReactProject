import { useEffect, useState } from 'react'
import {
    Link,
    Navigate,
    useNavigate,
    useParams,
} from 'react-router'
import { useAuth } from '../context/useAuth'
import { getPhoto, updatePhoto } from '../lib/photoApi'
import PhotoForm from './PhotoForm'

export default function PhotoEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, accessToken, loading } = useAuth()

    const [result, setResult] = useState(null)

    useEffect(() => {
        if (!user) return

        const controller = new AbortController()

        async function loadPhoto() {
            try {
                const photo = await getPhoto(id, controller.signal)

                if (!controller.signal.aborted) {
                    setResult({ id, photo, error: '' })
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setResult({
                        id,
                        photo: null,
                        error: err.message || 'Could not load the photo.',
                    })
                }
            }
        }

        loadPhoto()

        return () => controller.abort()
    }, [id, user?.id])

    async function handleUpdate(values) {
        const photo = await updatePhoto(id, values, accessToken)

        navigate(`/photos/${photo.id}`, { replace: true })
    }

    if (loading) {
        return (
            <section className="auth-page">
                <div className="loader" role="status" aria-label="Loading" />
            </section>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (!result || result.id !== id) {
        return (
            <section className="auth-page">
                <div
                    className="loader"
                    role="status"
                    aria-label="Loading photo"
                />
            </section>
        )
    }

    if (result.error) {
        return (
            <section className="auth-page photo-form-page">
                <div className="auth-card">
                    <p className="auth-error" role="alert">
                        {result.error}
                    </p>

                    <Link to="/portfolio" className="photo-back">
                        ← Back to portfolio
                    </Link>
                </div>
            </section>
        )
    }

    const photo = result.photo

    if (photo.is_default || photo.author_id !== user.id) {
        return (
            <Navigate to={`/photos/${photo.id}`} replace />
        )
    }

    return (
        <section className="auth-page photo-form-page">
            <div className="auth-card">
                <h1>Edit Photo</h1>

                <p className="photo-form-intro">
                    Update your photograph and its information.
                </p>

                <PhotoForm
                    key={photo.id}
                    initialValues={photo}
                    submitLabel="Save Changes"
                    cancelTo={`/photos/${photo.id}`}
                    onSubmit={handleUpdate}
                />
            </div>
        </section>
    )
}