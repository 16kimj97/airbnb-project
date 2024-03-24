import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SpotTile = ({ spot: { id, name, previewImage, city, state, avgRating, avgStars, price } }) => {
  const [displayRating, setDisplayRating] = useState("New");

  useEffect(() => {
    const rating = avgRating || avgStars;
    const formattedRating = rating ? parseFloat(rating).toFixed(1) : "New";
    setDisplayRating(formattedRating);
  }, [avgRating, avgStars]);

  return (
    <NavLink to={`/spots/${id}`} className="spot-tile-link">
      <div className="spot-tile-container">
        <div className="spot-tile-title">{name}</div>
        <img src={previewImage} alt={name} className="spot-tile-image" />

        <div className="spot-tile-info">
          <p className="spot-tile-location">{`${city}, ${state}`}</p>
          <p className="spot-tile-rating">
            <i className="fas fa-star"></i>
            {isNaN(displayRating) ? "New" : displayRating}
          </p>
        </div>

        <p className="spot-tile-price">{`$${price} / night`}</p>
      </div>
    </NavLink>
  );
};

export default SpotTile;
