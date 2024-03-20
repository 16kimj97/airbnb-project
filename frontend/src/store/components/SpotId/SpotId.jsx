import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../spots';
import './SpotId.css'
import GetReviews from '../Reviews/Reviews';

function LocationDetails({ details }) {
  return (
    <div className="location-details">
      <h3 className="location-text">{`${details.city}, ${details.state}`}</h3>
    </div>
  );
}

function SpotOverview() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spotDetail = useSelector((state) => state.spots.spot);

  useEffect(() => {
    dispatch(fetchSpotById(spotId));
  }, [dispatch, spotId]);

  const calculatedRating = parseFloat(spotDetail?.avgStarRating);
  // console.log(spotDetail);

  return spotDetail ? (
    <div className="spot-overview-container">
      <h1 className="spot-title">{spotDetail.name}</h1>
      <LocationDetails details={spotDetail} />
      <div className="spot-imagery-section">
        <div className="main-image-display">
          {spotDetail.SpotImages?.length >= 1 && (
            <img
              src={spotDetail.SpotImages.find((img) => img.preview === true).url}
              alt={spotDetail.name}
              className="primary-spot-visual"
            />
          )}
        </div>
        <div className="gallery-thumbnails">
          {spotDetail.SpotImages?.length > 1 && (
            <ul className="thumbnail-list">
              {spotDetail.SpotImages.filter((img) => !img.preview).map((image) => (
                <li key={image.id} className="thumbnail-item">
                  <img src={image.url} alt={spotDetail.name} className="thumbnail-image" />
                </li>
              ))}
            </ul>
          )}
        </div>
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
              {!isNaN(calculatedRating) ? calculatedRating.toFixed(1) : "New"}
              {spotDetail.numReviews === 0
                ? ""
                : ` · ${spotDetail.numReviews} Review${spotDetail.numReviews > 1 ? 's' : ''}`}
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
  ) : (
    <div>Loading spot details...</div>
  );
}

export default SpotOverview;
