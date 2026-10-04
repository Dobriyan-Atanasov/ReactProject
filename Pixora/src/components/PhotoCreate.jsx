import { Navigate, useNavigate } from 'react-router'
import { useAuth } from '../context/useAuth'
import { createPhoto } from '../lib/photoApi'
import PhotoForm from './PhotoForm'

export default function PhotoCreate() {
    const { user, accessToken, loading } = useAuth()
    const navigate = useNavigate()

    async function handleCreate(values) {
        const photo = await createPhoto(values, accessToken)

        // Replace the Add Photo page with the portfolio.
        navigate('/portfolio', { replace: true })

        // Open the details popup as the next history entry.
        navigate(`/photos/${photo.id}`, {
            state: {
                backgroundLocation: {
                    pathname: '/portfolio',
                    search: '',
                    hash: '',
                    state: null,
                    key: 'portfolio',
                },
            },
        })
    }

    if (loading) {
        return (
            <section className="auth-page">
                <div
                    className="loader"
                    role="status"
                    aria-label="Loading"
                />
            </section>
        )
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <section className="auth-page photo-form-page">
            <div className="auth-card">
                <h1>Add Photo</h1>

                <p className="photo-form-intro">
                    Share a new photograph with the Pixora gallery.
                </p>

                <PhotoForm
                    submitLabel="Add Photo"
                    cancelTo="/portfolio"
                    onSubmit={handleCreate}
                />
            </div>
        </section>
    )
}