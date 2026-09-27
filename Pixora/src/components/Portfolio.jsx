import { useEffect, useRef, useState } from "react"

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(4)
  const [isPlaying, setIsPlaying] = useState(false)
  const [size, setSize] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))
  const touchStart = useRef(null)
  const totalItems = 9
  const prev = () => setCurrentIndex(index => (index - 1 + totalItems) % totalItems)
  const next = () => setCurrentIndex(index => (index + 1) % totalItems)

  useEffect(() => {
    if (!isPlaying) return undefined
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    let timer
    const resize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => setSize({ width: window.innerWidth, height: window.innerHeight }), 100)
    }
    window.addEventListener("resize", resize)
    return () => { window.removeEventListener("resize", resize); clearTimeout(timer) }
  }, [])

  useEffect(() => {
    const keydown = event => {
      if (event.key === "ArrowLeft") prev()
      if (event.key === "ArrowRight") next()
      if (event.key === " ") { event.preventDefault(); setIsPlaying(playing => !playing) }
    }
    document.addEventListener("keydown", keydown)
    return () => document.removeEventListener("keydown", keydown)
  }, [])

  const itemStyle = index => {
    let spacing = size.height > 900 ? 250 : size.height < 768 ? 180 : 220
    if (size.width <= 480) spacing = Math.min(spacing * 0.7, 140)
    else if (size.width <= 768) spacing = Math.min(spacing * 0.8, 170)
    let offset = index - currentIndex
    if (offset > totalItems / 2) offset -= totalItems
    else if (offset < -totalItems / 2) offset += totalItems
    const distance = Math.abs(offset)
    const depth = distance === 0 ? 100 : distance === 1 ? 0 : distance === 2 ? -100 : distance === 3 ? -150 : -200
    const rotation = distance === 0 ? 0 : offset * (distance === 1 ? -40 : distance === 2 ? -50 : distance === 3 ? -60 : -70)
    const scale = [1.1, 0.85, 0.7, 0.6][distance] ?? 0.5
    const opacity = [1, 0.7, 0.5, 0.3][distance] ?? 0.2
    return { transform: `translate(-50%, -50%) translateX(${offset * spacing}px) translateZ(${depth}px) rotateY(${rotation}deg) scale(${scale})`, opacity, zIndex: totalItems - distance }
  }

  const endTouch = event => {
    if (!touchStart.current) return
    const diffX = touchStart.current.x - event.changedTouches[0].clientX
    const diffY = touchStart.current.y - event.changedTouches[0].clientY
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) next()
      else prev()
    }
    touchStart.current = null
  }
  return (
  <section className="portfolio-section" id="portfolio">
    <div className="section-header reveal">
      <h2 className="section-title">Featured Work</h2>
      <p className="section-subtitle">
        Explore my latest photography projects across various genres and styles
      </p>
    </div>
    <div className="coverflow-wrapper">
      <div className="coverflow-container" id="coverflowContainer" onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY } }} onTouchEnd={endTouch}>
        {/* Portrait Photography */}
        <div className="coverflow-item" data-index={0} style={itemStyle(0)} onClick={() => { if (currentIndex === 0) console.log("Center item clicked"); else setCurrentIndex(0) }}>
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
        <div className="coverflow-item" data-index={1} style={itemStyle(1)} onClick={() => { if (currentIndex === 1) console.log("Center item clicked"); else setCurrentIndex(1) }}>
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
        <div className="coverflow-item" data-index={2} style={itemStyle(2)} onClick={() => { if (currentIndex === 2) console.log("Center item clicked"); else setCurrentIndex(2) }}>
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
        <div className="coverflow-item" data-index={3} style={itemStyle(3)} onClick={() => { if (currentIndex === 3) console.log("Center item clicked"); else setCurrentIndex(3) }}>
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
        <div className="coverflow-item" data-index={4} style={itemStyle(4)} onClick={() => { if (currentIndex === 4) console.log("Center item clicked"); else setCurrentIndex(4) }}>
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
        <div className="coverflow-item" data-index={5} style={itemStyle(5)} onClick={() => { if (currentIndex === 5) console.log("Center item clicked"); else setCurrentIndex(5) }}>
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
        <div className="coverflow-item" data-index={6} style={itemStyle(6)} onClick={() => { if (currentIndex === 6) console.log("Center item clicked"); else setCurrentIndex(6) }}>
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
        <div className="coverflow-item" data-index={7} style={itemStyle(7)} onClick={() => { if (currentIndex === 7) console.log("Center item clicked"); else setCurrentIndex(7) }}>
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
        <div className="coverflow-item" data-index={8} style={itemStyle(8)} onClick={() => { if (currentIndex === 8) console.log("Center item clicked"); else setCurrentIndex(8) }}>
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
        <button className="control-btn" id="prevBtn" onClick={prev} aria-label="Previous photo">
          ‹
        </button>
        <button className={`control-btn${isPlaying ? " playing" : ""}`} id="playPauseBtn" onClick={() => setIsPlaying(playing => !playing)} aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}>
          {isPlaying ? "❚❚" : "▶"}
        </button>
        <button className="control-btn" id="nextBtn" onClick={next} aria-label="Next photo">
          ›
        </button>
      </div>
      {/* Indicators */}
      <div className="indicators" id="indicators">
        <button type="button" className={`indicator${currentIndex === 0 ? " active" : ""}`} data-index={0} onClick={() => setCurrentIndex(0)} aria-label="Show photo 1" />
        <button type="button" className={`indicator${currentIndex === 1 ? " active" : ""}`} data-index={1} onClick={() => setCurrentIndex(1)} aria-label="Show photo 2" />
        <button type="button" className={`indicator${currentIndex === 2 ? " active" : ""}`} data-index={2} onClick={() => setCurrentIndex(2)} aria-label="Show photo 3" />
        <button type="button" className={`indicator${currentIndex === 3 ? " active" : ""}`} data-index={3} onClick={() => setCurrentIndex(3)} aria-label="Show photo 4" />
        <button type="button" className={`indicator${currentIndex === 4 ? " active" : ""}`} data-index={4} onClick={() => setCurrentIndex(4)} aria-label="Show photo 5" />
        <button type="button" className={`indicator${currentIndex === 5 ? " active" : ""}`} data-index={5} onClick={() => setCurrentIndex(5)} aria-label="Show photo 6" />
        <button type="button" className={`indicator${currentIndex === 6 ? " active" : ""}`} data-index={6} onClick={() => setCurrentIndex(6)} aria-label="Show photo 7" />
        <button type="button" className={`indicator${currentIndex === 7 ? " active" : ""}`} data-index={7} onClick={() => setCurrentIndex(7)} aria-label="Show photo 8" />
        <button type="button" className={`indicator${currentIndex === 8 ? " active" : ""}`} data-index={8} onClick={() => setCurrentIndex(8)} aria-label="Show photo 9" />
      </div>
    </div>
  </section>
  )
}
