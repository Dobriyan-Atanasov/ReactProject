import { Link } from 'react-router'

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-bg" />
      <div className="hero-shapes">
        <div className="floating-accent accent-1" />
        <div className="floating-accent accent-2" />
        <div className="floating-accent accent-3" />
      </div>
      <div className="hero-content reveal">
        <h1 className="hero-title">Welcome to Pixora</h1>
        <p className="hero-subtitle">Professional Photography Portfolio</p>
        <Link to="/portfolio" className="cta-button">
          View Our Work
        </Link>
      </div>
    </section>
  )
}
