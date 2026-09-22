export default function Header() {
    return (
        <>
            {/* Header Navigation */}
            <header id="header">
                <nav>
                    <a href="#home" className="logo">
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
                    </a>
                    <ul className="nav-menu" id="navMenu">
                        <li>
                            <a href="#home">Home</a>
                        </li>
                        <li>
                            <a href="#portfolio">Portfolio</a>
                        </li>
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#services">Services</a>
                        </li>
                        <li>
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                    <div className="menu-toggle" id="menuToggle">
                        <span />
                        <span />
                        <span />
                    </div>
                </nav>
            </header>
        </>
    );
}