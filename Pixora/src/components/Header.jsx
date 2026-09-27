import { useEffect, useState } from "react"
import { Link, NavLink } from 'react-router'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

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
                        <li>
                            <NavLink to="/" className={activeSection === "home" ? "active" : ""} onClick={closeMenu}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/portfolio" onClick={closeMenu}>Portfolio</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={activeSection === "about" ? "active" : ""} onClick={closeMenu}>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/services" className={activeSection === "services" ? "active" : ""} onClick={closeMenu}>Services</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact" className={activeSection === "contact" ? "active" : ""} onClick={closeMenu}>Contact</NavLink>
                        </li>
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