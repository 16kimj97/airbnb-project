import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const SpotTile = ({ spot }) => {
  const [displayRating, setDisplayRating] = useState("New");

  useEffect(() => {
    const rating = spot.avgRating || spot.avgStars;
    const formattedRating = rating ? parseFloat(rating).toFixed(1) : "New";
    setDisplayRating(formattedRating);
  }, [spot]);

  return (
    <NavLink to={`/spots/${spot.id}`} className="spot-link">
      <div className="spot-tile">
        <div className="spot-title">{spot.name}</div>
        <img src={spot.previewImage} alt={spot.name} className="spot-image" />

        <div className="spot-info">
          <p className="spot-location">{`${spot.city}, ${spot.state}`}</p>
          <p className="spot-rating">
            <i className="fas fa-star"></i>
            <FontAwesomeIcon icon={faStar} />
            {displayRating}
          </p>
        </div>

        <p className="spot-price">{`$${spot.price} / night`}</p>
      </div>
    </NavLink>
  );
};

export default SpotTile;
