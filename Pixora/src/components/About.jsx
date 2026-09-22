export default function About() {
  return (
  <section className="about-section" id="about">
    <div className="about-container reveal">
      <div className="about-image">
        <img src="/images/templatemo-about-artist.jpg" alt="Photographer" />
      </div>
      <div className="about-content">
        <h2>About the Artist</h2>
        <p>
          With over a decade of experience in professional photography, I
          specialize in capturing the extraordinary in everyday moments. My
          journey began with a simple camera and an insatiable curiosity about
          the world around me.
        </p>
        <p>
          From the bustling streets of urban landscapes to the serene beauty of
          nature, I strive to tell stories through my lens. Each photograph is a
          carefully crafted piece of art, designed to evoke emotion and preserve
          memories that last a lifetime.
        </p>
        <p>
          My work has been featured in numerous galleries and publications
          worldwide, but my greatest satisfaction comes from creating images
          that resonate with people on a personal level.
        </p>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">500+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10+</div>
            <div className="stat-label">Years</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Awards</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
