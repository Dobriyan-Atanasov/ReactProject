import { useCallback, useEffect, useRef, useState } from 'react'
import { getPhotos } from '../lib/photoApi'
import PhotoCard from './PhotoCard'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import { useAuth } from '../context/useAuth'

export default function Portfolio() {
  const { user } = useAuth()
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentIndex, setCurrentIndex] = useState(4)
  const [isPlaying, setIsPlaying] = useState(false)
  const navigate = useNavigate()
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  const touchStart = useRef(null)
  const totalItems = photos.length
  const selectedIndex = Math.min(currentIndex, Math.max(totalItems - 1, 0))

  // Load the cards from Supabase.
  useEffect(() => {
    const controller = new AbortController()

    getPhotos(controller.signal)
      .then(data => {
        if (!controller.signal.aborted) {
          setPhotos(data)
          setCurrentIndex(Math.min(4, Math.max(data.length - 1, 0)))
        }
      })
      .catch(err => {
        if (!controller.signal.aborted) setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const prev = useCallback(() => {
    if (!totalItems) return
    setCurrentIndex(index => (index - 1 + totalItems) % totalItems)
  }, [totalItems])

  const next = useCallback(() => {
    if (!totalItems) return
    setCurrentIndex(index => (index + 1) % totalItems)
  }, [totalItems])

  // Autoplay.
  useEffect(() => {
    if (!isPlaying || totalItems < 2) return

    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isPlaying, totalItems, next])

  // Recalculate spacing after resizing.
  useEffect(() => {
    let timer

    const resize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 100)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      clearTimeout(timer)
    }
  }, [])

  // Keyboard navigation.
  useEffect(() => {
    if (!totalItems) return

    const keydown = event => {
      const target = event.target
      if (target instanceof HTMLElement && target.closest('dialog')) {
        return
      }

      if (
        target instanceof HTMLElement &&
        (target.matches('input, textarea, select, button, a') ||
          target.isContentEditable)
      ) {
        return
      }

      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()

      if (event.key === ' ') {
        event.preventDefault()
        setIsPlaying(playing => !playing)
      }
    }

    document.addEventListener('keydown', keydown)
    return () => document.removeEventListener('keydown', keydown)
  }, [totalItems, prev, next])

  const itemStyle = index => {
    let spacing = size.height > 900 ? 250 : size.height < 768 ? 180 : 220

    if (size.width <= 480) {
      spacing = Math.min(spacing * 0.7, 140)
    } else if (size.width <= 768) {
      spacing = Math.min(spacing * 0.8, 170)
    }

    let offset = index - selectedIndex

    if (offset > totalItems / 2) offset -= totalItems
    else if (offset < -totalItems / 2) offset += totalItems

    const distance = Math.abs(offset)

    const depth =
      distance === 0 ? 100 :
        distance === 1 ? 0 :
          distance === 2 ? -100 :
            distance === 3 ? -150 : -200

    const rotation = distance === 0 ? 0 : offset * (
      distance === 1 ? -40 :
        distance === 2 ? -50 :
          distance === 3 ? -60 : -70
    )

    const scale = [1.1, 0.85, 0.7, 0.6][distance] ?? 0.5
    const opacity = [1, 0.7, 0.5, 0.3][distance] ?? 0.2

    return {
      transform: `
        translate(-50%, -50%)
        translateX(${offset * spacing}px)
        translateZ(${depth}px)
        rotateY(${rotation}deg)
        scale(${scale})
      `,
      opacity,
      zIndex: totalItems - distance,
    }
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
        {user && (
          <div className="portfolio-add">
            <Link to="/photos/create" className="cta-button">
              Add Photo
            </Link>
          </div>
        )}
      </div>

      {loading ? (
        <div className="loader" role="status" aria-label="Loading photos" />
      ) : error ? (
        <p className="auth-error" role="alert">{error}</p>
      ) : totalItems === 0 ? (
        <p>No photos have been added yet.</p>
      ) : (
        <div className="coverflow-wrapper">
          <div
            className="coverflow-container"
            id="coverflowContainer"
            onTouchStart={event => {
              touchStart.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              }
            }}
            onTouchEnd={endTouch}
            onTouchCancel={() => { touchStart.current = null }}
          >
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                index={index}
                style={itemStyle(index)}
                onClick={() => {
                  if (index === selectedIndex) {
                    navigate(`/photos/${photo.id}`)
                  } else {
                    setCurrentIndex(index)
                  }
                }}
              />
            ))}
          </div>

          <div className="coverflow-controls">
            <button
              type="button"
              className="control-btn"
              id="prevBtn"
              onClick={prev}
              aria-label="Previous photo"
            >
              ‹
            </button>

            <button
              type="button"
              className={`control-btn${isPlaying ? ' playing' : ''}`}
              id="playPauseBtn"
              onClick={() => setIsPlaying(playing => !playing)}
              aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>

            <button
              type="button"
              className="control-btn"
              id="nextBtn"
              onClick={next}
              aria-label="Next photo"
            >
              ›
            </button>
          </div>

          <div className="indicators" id="indicators">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                className={`indicator${selectedIndex === index ? ' active' : ''}`}
                onClick={() => {
                  if (index === selectedIndex) {
                    navigate(`/photos/${photo.id}`)
                  } else {
                    setCurrentIndex(index)
                  }
                }}
                aria-label={`Show photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}