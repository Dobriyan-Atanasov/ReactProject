import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
    deletePhoto,
    getPhoto,
    getPhotoAuthor,
} from '../lib/photoApi'
import { useAuth } from '../context/useAuth'

export default function PhotoDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, accessToken } = useAuth()

    const dialogRef = useRef(null)

    const [result, setResult] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        setDeleteError('')

        async function loadPhoto() {
            try {
                const photo = await getPhoto(id, controller.signal)

                let author = null

                if (!photo.is_default && photo.author_id) {
                    author = await getPhotoAuthor(
                        photo.author_id,
                        controller.signal
                    ).catch(() => null)
                }

                if (!controller.signal.aborted) {
                    setResult({ id, photo, author, error: '' })
                }
            } catch (err) {
                if (!controller.signal.aborted) {
                    setResult({
                        id,
                        error: err.message || 'Could not load the photo.',
                    })
                }
            }
        }

        loadPhoto()

        return () => controller.abort()
    }, [id])

    useEffect(() => {

        const dialog = dialogRef.current
        const previousOverflow = document.body.style.overflow

        dialog.showModal()
        document.body.style.overflow = 'hidden'

        return () => {
            dialog.close()
            document.body.style.overflow = previousOverflow
        }
    }, [])

    function close() {
        if (deleting) return

        navigate('/portfolio', {
            replace: true,
            state: { selectedPhotoId: id },
        })
    }

    async function handleDelete() {
        const photo = result?.photo

        if (
            !photo ||
            photo.is_default ||
            photo.author_id !== user?.id ||
            deleting
        ) {
            return
        }

        const confirmed = window.confirm(
            `Delete "${photo.title}"? This cannot be undone.`
        )

        if (!confirmed) return

        setDeleting(true)
        setDeleteError('')

        try {
            await deletePhoto(photo.id, accessToken)

            navigate('/portfolio', { replace: true })
        } catch (err) {
            setDeleteError(err.message || 'Could not delete the photo.')
        } finally {
            setDeleting(false)
        }
    }

    let content

    if (!result || result.id !== id) {
        content = (
            <div className="photo-status">
                <div
                    className="loader"
                    role="status"
                    aria-label="Loading photo"
                />
            </div>
        )
    } else if (result.error) {
        content = (
            <p className="photo-status auth-error" role="alert">
                {result.error}
            </p>
        )
    } else {
        const { photo, author } = result

        const authorName =
            author?.nickname ||
            [author?.firstName, author?.lastName]
                .filter(Boolean)
                .join(' ') ||
            'Unavailable'

        const isOwner =
            Boolean(user) &&
            !photo.is_default &&
            photo.author_id === user.id

        const wasUpdated =
            photo.updated_at &&
            new Date(photo.updated_at).getTime() >
            new Date(photo.created_at).getTime()

        content = (
            <article className="photo-details">
                <div className="photo-details-image">
                    <img src={photo.image_url} alt={photo.title} />
                </div>

                <div className="photo-details-info">
                    <p className="portfolio-category">{photo.category}</p>

                    <h1>{photo.title}</h1>

                    <p className="photo-details-description">
                        {photo.description}
                    </p>

                    {!photo.is_default && (
                        <>
                            <p className="photo-author">
                                Added by <strong>{authorName}</strong>
                            </p>

                            {wasUpdated && (
                                <p className="photo-updated">
                                    Updated by {authorName} on{' '}
                                    {new Date(photo.updated_at).toLocaleString()}
                                </p>
                            )}
                        </>
                    )}

                    {isOwner && (
                        <div className="photo-actions">
                            <button
                                type="button"
                                className="cta-button"
                                disabled={deleting}
                                onClick={() =>
                                    navigate(`/photos/${photo.id}/edit`)
                                }
                            >
                                Edit Photo
                            </button>

                            <button
                                type="button"
                                className="photo-delete-button"
                                disabled={deleting}
                                onClick={handleDelete}
                            >
                                {deleting ? 'Deleting…' : 'Delete Photo'}
                            </button>
                        </div>
                    )}

                    {deleteError && (
                        <p className="auth-error" role="alert">
                            {deleteError}
                        </p>
                    )}
                </div>
            </article>
        )
    }

    return (
        <dialog
            ref={dialogRef}
            className="photo-dialog"
            aria-label="Photo details"
            onCancel={event => {
                event.preventDefault()
                close()
            }}
            onClick={event => {
                if (event.target !== event.currentTarget) return

                const bounds = event.currentTarget.getBoundingClientRect()

                if (
                    event.clientX < bounds.left ||
                    event.clientX > bounds.right ||
                    event.clientY < bounds.top ||
                    event.clientY > bounds.bottom
                ) {
                    close()
                }
            }}
        >
            <button
                type="button"
                className="photo-close"
                onClick={close}
                disabled={deleting}
                aria-label="Close photo details"
                autoFocus
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    aria-hidden="true"
                >
                    <path d="M6 6L18 18M18 6L6 18" />
                </svg>
            </button>

            {content}
        </dialog>
    )
}
