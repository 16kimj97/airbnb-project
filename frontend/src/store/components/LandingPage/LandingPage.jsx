import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../spots';
import SpotTile from './SpotTile';
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();

  const spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="spots-list">
      {spots.length > 0 ? (
        spots.map((spot) => (
          <SpotTile key={spot.id} spot={spot} />
        ))
      ) : (
        <p>Loading spots...</p>
      )}
    </div>
  );
};

export default LandingPage;
