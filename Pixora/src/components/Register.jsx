import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { register } from '../lib/authApi'
import { useAuth } from '../context/useAuth'

export default function Register() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
        imageURL: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)

    function handleChange(event) {
        const { name, value } = event.target
        setForm(current => ({ ...current, [name]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setMessage('')

        if (
            !form.firstName.trim() ||
            !form.lastName.trim() ||
            !form.nickname.trim()
        ) {
            setError('Enter your first name, last name and nickname.')
            return
        }

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setSubmitting(true)

        try {
            await register(form.email.trim(), form.password, {
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                nickname: form.nickname.trim(),
                imageURL: form.imageURL.trim(),
            })

            navigate('/login', { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) return <section className="auth-page">Loading...</section>
    if (user) return <Navigate to="/profile" replace />

    const fields = [
        { name: 'firstName', label: 'First name', autoComplete: 'given-name' },
        { name: 'lastName', label: 'Last name', autoComplete: 'family-name' },
        { name: 'nickname', label: 'Nickname', autoComplete: 'nickname' },
        { name: 'imageURL', label: 'Profile image URL', type: 'url', optional: true },
        { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
        { name: 'password', label: 'Password', type: 'password', autoComplete: 'new-password' },
        { name: 'confirmPassword', label: 'Confirm password', type: 'password', autoComplete: 'new-password' },
    ]

    return (
        <section className="auth-page">
            <div className="auth-card reveal">
                <h1 className="section-title">Register</h1>
                <p className="section-subtitle">Join Pixora</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <div className="auth-field" key={field.name}>
                            <label htmlFor={`register-${field.name}`}>
                                {field.label}
                            </label>
                            <input
                                id={`register-${field.name}`}
                                name={field.name}
                                type={field.type || 'text'}
                                autoComplete={field.autoComplete}
                                value={form[field.name]}
                                onChange={handleChange}
                                required={!field.optional}
                                minLength={field.type === 'password' ? 6 : undefined}
                            />
                        </div>
                    ))}

                    {error && <p className="auth-error" role="alert">{error}</p>}
                    {message && <p role="status">{message}</p>}

                    <button
                        className="cta-button"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-switch">
                    Already registered? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    )
}