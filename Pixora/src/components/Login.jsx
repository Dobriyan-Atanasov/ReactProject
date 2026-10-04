import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { login } from '../lib/authApi'
import { useAuth } from '../context/useAuth'

export default function Login() {
    const { user, loading, saveSession } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    if (loading) return <section className="auth-page">Loading...</section>
    if (user) return <Navigate to="/profile" replace />

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')

        if (!email.trim() || !password) {
            setError('Enter your email and password.')
            return
        }

        setSubmitting(true)

        try {
            const session = await login(email.trim(), password)
            saveSession(session)
            navigate('/profile', { replace: true })
        } catch (err) {
            setError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-card reveal">
                <h1 className="section-title">Log In</h1>
                <p className="section-subtitle">Welcome back to Pixora</p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <label htmlFor="login-email">Email</label>
                    <input
                        id="login-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />

                    {error && <p className="auth-error" role="alert">{error}</p>}

                    <button className="cta-button" type="submit" disabled={submitting}>
                        {submitting ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                <p className="auth-switch">
                    No account yet? <Link to="/register">Register</Link>
                </p>
            </div>
        </section>
    )
}