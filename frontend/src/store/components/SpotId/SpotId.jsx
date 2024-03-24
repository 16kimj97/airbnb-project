import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../spots';
import './SpotId.css'
import GetReviews from '../Reviews/Reviews';

function SpotOverview() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const spotDetail = useSelector((state) => state.spots.spot);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      await dispatch(fetchSpotById(spotId));
      setIsLoading(false);
    };

    fetchDetails();
  }, [dispatch, spotId]);

  const formatRating = (rating, numReviews) => {
    const ratingText = !isNaN(rating) ? rating.toFixed(1) : "New";
    const reviewCountText = numReviews === 0 ? "" : ` · ${numReviews} Review${numReviews > 1 ? 's' : ''}`;
    return <>{ratingText}{reviewCountText}</>;
  };

  if (isLoading) return <div>Loading spot details...</div>;

  const calculatedRating = spotDetail ? parseFloat(spotDetail.avgStarRating) : null;

  return (
    <div className="spot-overview-container">
      <h1 className="spot-title">{spotDetail.name}</h1>
      <div className="location-details">
        <h3 className="location-text">{`${spotDetail.city}, ${spotDetail.state}`}</h3>
      </div>
      <div className="spot-imagery-section">
        {spotDetail.SpotImages?.[0] && (
          <div className="main-image-display">
            <img
              src={spotDetail.SpotImages.find((img) => img.preview === true)?.url}
              alt={spotDetail.name}
              className="primary-spot-visual"
            />
          </div>
        )}
        {spotDetail.SpotImages?.length > 1 && (
          <div className="gallery-thumbnails">
            <ul className="thumbnail-list">
              {spotDetail.SpotImages.filter((img) => !img.preview).map(({ id, url }) => (
                <li key={id} className="thumbnail-item">
                  <img src={url} alt={spotDetail.name} className="thumbnail-image" />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="spot-details-wrap">
        <div className="host-details-section">
          <h3 className="host-info">
            Hosted by {spotDetail.Owner?.firstName} {spotDetail.Owner?.lastName}
          </h3>
          <p className="spot-description">{spotDetail.description}</p>
        </div>
        <div className="booking-info">
          <div className="rating-and-pricing">
          <p className="rating-display">
              <i className="fas fa-star"></i>
              {formatRating(calculatedRating, spotDetail.numReviews)}
            </p>
            <p className="pricing-per-night">{`$${spotDetail.price} / night`}</p>
          </div>
          <button
            className="reservation-button"
            onClick={() => alert("Reservation feature is currently under development. Please check back later.")}
          >
            Book Now
          </button>
        </div>
      </div>
      <GetReviews spot={spotDetail} />
    </div>
  );
}

export default SpotOverview;
