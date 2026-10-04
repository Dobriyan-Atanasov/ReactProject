import { useEffect, useState } from 'react'
import { getStats } from '../lib/statsApi'

export default function About() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadStats() {
      try {
        const data = await getStats(controller.signal)

        if (!controller.signal.aborted) {
          setStats(data)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message || 'Could not load the statistics.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadStats()

    return () => controller.abort()
  }, [])

  return (
    <section className="about-section" id="about">
      <div className="about-container reveal">
        <div className="about-image">
          <img
            src={`${import.meta.env.BASE_URL}images/templatemo-about-artist.jpg`}
            alt="Photographer"
          />
        </div>

        <div className="about-content">
          <h2>About the Artists</h2>

          <p>
            We are a community of photographers capturing the extraordinary in
            everyday moments. Our journeys began with a simple camera and a
            curiosity about the world around us.
          </p>

          <p>
            From bustling urban streets to the serene beauty of nature, we tell
            stories through our lenses. Each photograph reflects an artist’s
            unique perspective, capturing emotions and preserving memories
            that last a lifetime.
          </p>

          <p>
            Pixora brings our work together in one shared gallery. Whether we
            are experienced photographers or just starting out, we share the
            satisfaction of creating images that connect with people.
          </p>

          {loading ? (
            <div
              className="loader"
              role="status"
              aria-label="Loading statistics"
            />
          ) : error ? (
            <p className="auth-error" role="alert">
              {error}
            </p>
          ) : (
            <div className="stats about-stats">
              <div className="stat-item">
                <div className="stat-number">{stats.projects}</div>
                <div className="stat-label">Projects</div>
              </div>

              <div className="stat-item">
                <div className="stat-number">{stats.users}</div>
                <div className="stat-label">Users</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}