import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../spots'
import SpotBox from './SpotBox';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    const fetchingSpots = async () => {
      try {
        const response = await fetch("/api/spots");
        const data = await response.json();
        if (data && data.Spots) {
          dispatch(fetchSpots(data.Spots));
        }
      } catch (error) {
        console.error("Failed to fetch spots:", error);
      }
    };

    fetchingSpots();
  }, [dispatch]);

  return (
    <div className="landing-page">
      <h1 className="spots-title">All Spots</h1>
      <div className="spots-list">
        {
        spots && spots.Spots ? (
          spots.Spots.map((spot) => (
            <SpotBox key={spot.id} spot={spot} />
          ))
        ) : (
          <p>Loading spots...</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
