export default function Portfolio() {
  return (
  <section className="portfolio-section" id="portfolio">
    <div className="section-header reveal">
      <h2 className="section-title">Featured Work</h2>
      <p className="section-subtitle">
        Explore my latest photography projects across various genres and styles
      </p>
    </div>
    <div className="coverflow-wrapper">
      <div className="coverflow-container" id="coverflowContainer">
        {/* Portrait Photography */}
        <div className="coverflow-item" data-index={0}>
          <img
            src="/images/templatemo-amber-folio-01.jpg"
            alt="Portrait Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Portrait</div>
            <h3 className="portfolio-title">Human Stories</h3>
            <p className="portfolio-description">
              Capturing authentic emotions and personalities
            </p>
          </div>
        </div>
        {/* Landscape Photography */}
        <div className="coverflow-item" data-index={1}>
          <img
            src="/images/templatemo-amber-folio-02.jpg"
            alt="Landscape Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Landscape</div>
            <h3 className="portfolio-title">Nature's Canvas</h3>
            <p className="portfolio-description">
              Breathtaking vistas and natural wonders
            </p>
          </div>
        </div>
        {/* Street Photography */}
        <div className="coverflow-item" data-index={2}>
          <img
            src="/images/templatemo-amber-folio-03.jpg"
            alt="Street Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Street</div>
            <h3 className="portfolio-title">Urban Life</h3>
            <p className="portfolio-description">
              Candid moments in city environments
            </p>
          </div>
        </div>
        {/* Architecture Photography */}
        <div className="coverflow-item" data-index={3}>
          <img
            src="/images/templatemo-amber-folio-04.jpg"
            alt="Architecture Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Architecture</div>
            <h3 className="portfolio-title">Structural Beauty</h3>
            <p className="portfolio-description">
              Modern lines and timeless designs
            </p>
          </div>
        </div>
        {/* Fashion Photography */}
        <div className="coverflow-item" data-index={4}>
          <img
            src="/images/templatemo-amber-folio-05.jpg"
            alt="Fashion Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Fashion</div>
            <h3 className="portfolio-title">Style &amp; Elegance</h3>
            <p className="portfolio-description">
              High fashion and editorial shoots
            </p>
          </div>
        </div>
        {/* Wildlife Photography */}
        <div className="coverflow-item" data-index={5}>
          <img
            src="/images/templatemo-amber-folio-06.jpg"
            alt="Wildlife Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Wildlife</div>
            <h3 className="portfolio-title">Wild Kingdom</h3>
            <p className="portfolio-description">
              Nature's magnificent creatures
            </p>
          </div>
        </div>
        {/* Black & White Photography */}
        <div className="coverflow-item" data-index={6}>
          <img
            src="/images/templatemo-amber-folio-07.jpg"
            alt="Black and White Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Monochrome</div>
            <h3 className="portfolio-title">Timeless Classics</h3>
            <p className="portfolio-description">The art of black and white</p>
          </div>
        </div>
        {/* Event Photography */}
        <div className="coverflow-item" data-index={7}>
          <img
            src="/images/templatemo-amber-folio-08.jpg"
            alt="Event Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Events</div>
            <h3 className="portfolio-title">Special Moments</h3>
            <p className="portfolio-description">Weddings and celebrations</p>
          </div>
        </div>
        {/* Abstract Photography */}
        <div className="coverflow-item" data-index={8}>
          <img
            src="/images/templatemo-amber-folio-09.jpg"
            alt="Abstract Photography"
            className="portfolio-image"
          />
          <div className="portfolio-overlay">
            <div className="portfolio-category">Abstract</div>
            <h3 className="portfolio-title">Creative Vision</h3>
            <p className="portfolio-description">
              Artistic and experimental works
            </p>
          </div>
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="coverflow-controls">
        <button className="control-btn" id="prevBtn">
          ‹
        </button>
        <button className="control-btn" id="playPauseBtn">
          ▶
        </button>
        <button className="control-btn" id="nextBtn">
          ›
        </button>
      </div>
      {/* Indicators */}
      <div className="indicators" id="indicators">
        <div className="indicator active" data-index={0} />
        <div className="indicator" data-index={1} />
        <div className="indicator" data-index={2} />
        <div className="indicator" data-index={3} />
        <div className="indicator" data-index={4} />
        <div className="indicator" data-index={5} />
        <div className="indicator" data-index={6} />
        <div className="indicator" data-index={7} />
        <div className="indicator" data-index={8} />
      </div>
    </div>
  </section>
  )
}
