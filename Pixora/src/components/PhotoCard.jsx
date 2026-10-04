export default function PhotoCard({ photo, index, style, onClick }) {
    return (
        <div
            className="coverflow-item"
            data-index={index}
            style={style}
            onClick={onClick}
        >
            <img
                src={photo.image_url}
                alt={photo.title}
                className="portfolio-image"
            />

            <div className="portfolio-overlay">
                <div className="portfolio-category">{photo.category}</div>
                <h3 className="portfolio-title">{photo.title}</h3>
                <p className="portfolio-description">{photo.description}</p>
            </div>
        </div>
    )
}