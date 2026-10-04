import { useEffect, useState } from "react"
import { Link, NavLink, useNavigate } from 'react-router'
import { useAuth } from '../context/useAuth'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, loading, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        try {
            await logout()
            closeMenu()
            navigate('/')
        } catch (error) {
            console.error('Logout request failed:', error)
            closeMenu()
            navigate('/')
        }
    }

    useEffect(() => {
        const update = () => {
            setScrolled(window.scrollY > 50)
        }

        update()
        window.addEventListener("scroll", update, { passive: true })
        return () => window.removeEventListener("scroll", update)
    }, [])

    const closeMenu = () => setMenuOpen(false)
    return (
        <>
            {/* Header Navigation */}
            <header id="header" className={scrolled ? "scrolled" : ""}>
                <nav>
                    <Link to="/" className="logo" onClick={closeMenu}>
                        <svg viewBox="0 0 48 24" xmlns="http://www.w3.org/2000/svg" aria-label="Pix">
                            <path
                                fillRule="evenodd"
                                d="M1 5H8L10 2H20L22 5H29V22H1V5ZM15 7.5A6 6 0 1 0 15 19.5A6 6 0 1 0 15 7.5Z"
                                fill="none"
                                stroke="var(--accent-color)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        Pixora
                    </Link>
                    <ul className={`nav-menu${menuOpen ? " active" : ""}`} id="navMenu">
                        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
                        <li><NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink></li>
                        <li><NavLink to="/about" onClick={closeMenu}>About</NavLink></li>
                        <li><NavLink to="/services" onClick={closeMenu}>Services</NavLink></li>
                        <li><NavLink to="/contact" onClick={closeMenu}>Contact</NavLink></li>
                        {!loading && (
                            user ? (
                                <>
                                    <li>
                                        <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="logout-button"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
                                    </li>
                                </>
                            )
                        )}
                    </ul>
                    <button type="button" className={`menu-toggle${menuOpen ? " active" : ""}`} id="menuToggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(open => !open)}>
                        <span />
                        <span />
                        <span />
                    </button>
                </nav>
            </header>
        </>
    );
}