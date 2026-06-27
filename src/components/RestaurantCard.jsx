import React, { useState, useEffect } from 'react';

export default function RestaurantCard({ name, cuisine, costForTwo, rating, deliveryTime, image, fallbackImage }) {
  // Try loading local image, fall back to online image if not available (or onError triggers)
  const localPath = `/images/${image}`;
  const [imgSrc, setImgSrc] = useState(localPath);
  const [hasFailed, setHasFailed] = useState(false);

  // If image prop changes, reset state
  useEffect(() => {
    setImgSrc(`/images/${image}`);
    setHasFailed(false);
  }, [image]);

  const handleImageError = () => {
    if (!hasFailed) {
      setImgSrc(fallbackImage);
      setHasFailed(true);
    }
  };

  const isHighRating = rating >= 4.2;

  return (
    <div className="restaurant-card">
      <div className="card-image-wrapper">
        <img 
          src={imgSrc} 
          alt={name} 
          className="card-image"
          onError={handleImageError}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">{name}</h3>
        <p className="card-cuisine">{cuisine}</p>
        <div className="card-meta">
          <span className={`rating-badge ${isHighRating ? 'rating-high' : 'rating-med'}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '2px' }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            {rating.toFixed(1)}
          </span>
          <span className="card-time">{deliveryTime}</span>
          <span className="card-cost">{costForTwo}</span>
        </div>
      </div>
    </div>
  );
}
