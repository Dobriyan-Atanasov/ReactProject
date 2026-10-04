import { useState } from 'react'
import { Link } from 'react-router'

export default function PhotoForm({
    initialValues = {},
    submitLabel,
    cancelTo,
    onSubmit,
}) {
    const [values, setValues] = useState({
        title: initialValues.title ?? '',
        category: initialValues.category ?? '',
        description: initialValues.description ?? '',
        image_url: initialValues.image_url ?? '',
    })

    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    function handleChange(event) {
        const { name, value } = event.target

        setValues(previous => ({
            ...previous,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        if (submitting) return

        setError('')

        const cleanedValues = {
            title: values.title.trim(),
            category: values.category.trim(),
            description: values.description.trim(),
            image_url: values.image_url.trim(),
        }

        if (
            !cleanedValues.title ||
            !cleanedValues.category ||
            !cleanedValues.description ||
            !cleanedValues.image_url
        ) {
            setError('Please complete all fields.')
            return
        }

        try {
            const imageUrl = new URL(cleanedValues.image_url)

            if (!['http:', 'https:'].includes(imageUrl.protocol)) {
                throw new Error()
            }
        } catch {
            setError('Enter an image URL starting with http:// or https://.')
            return
        }

        setSubmitting(true)

        try {
            await onSubmit(cleanedValues)
        } catch (err) {
            setError(err.message || 'Could not save the photo.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-field">
                <label htmlFor="photo-title">Title</label>

                <input
                    id="photo-title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    maxLength={120}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="auth-field">
                <label htmlFor="photo-category">Category</label>

                <input
                    id="photo-category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    maxLength={80}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="auth-field">
                <label htmlFor="photo-description">Description</label>

                <textarea
                    id="photo-description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    maxLength={4000}
                    rows={5}
                    disabled={submitting}
                    required
                />
            </div>

            <div className="auth-field">
                <label htmlFor="photo-image-url">Image URL</label>

                <input
                    id="photo-image-url"
                    type="url"
                    name="image_url"
                    value={values.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    maxLength={2048}
                    disabled={submitting}
                    required
                />
            </div>

            {error && (
                <p className="auth-error" role="alert">
                    {error}
                </p>
            )}

            <div className="photo-actions">
                <button
                    type="submit"
                    className="cta-button"
                    disabled={submitting}
                >
                    {submitting ? 'Saving…' : submitLabel}
                </button>

                {!submitting && (
                    <Link
                        to={cancelTo}
                        replace
                        className="photo-secondary-button"
                    >
                        Cancel
                    </Link>
                )}
            </div>
        </form>
    )
}