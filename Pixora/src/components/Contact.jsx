export default function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <div className="section-header reveal">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Let's create something beautiful together
          </p>
        </div>
        <div className="contact-info reveal">
          <a href="#" className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" />
              </svg>
            </div>
            <div className="contact-label">Email</div>
            <div className="contact-value">no-reply@pixora.com</div>
          </a>
          <a href="#" className="contact-item">
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" />
              </svg>
            </div>
            <div className="contact-label">Phone</div>
            <div className="contact-value">+359 9999 99999</div>
          </a>
          <a
            href="https://maps.app.goo.gl/jG4KdbGBrBi5Zks58"
            target="_blank"
            rel="noopener"
            className="contact-item"
          >
            <div className="contact-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9S10.62 6.5 12 6.5S14.5 7.62 14.5 9S13.38 11.5 12 11.5Z" />
              </svg>
            </div>
            <div className="contact-label">National Palace of Culture Studio</div>
            <div className="contact-value">Sofia, Bulgaria</div>
          </a>
        </div>
      </div>
    </section>
  )
}
