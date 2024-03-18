import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../spots'
import SpotTile from './SpotTile';
import "./LandingPage.css";

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  useEffect(() => {
    console.log(spots);
  }, [spots]);


  return (
    <div className="landing-page">
      <h1 className="spots-title">All Spots</h1>
      <div className="spots-list">
        {
        spots && spots.Spots ? (
          spots.Spots.map((spot) => (
            <SpotTile key={spot.id} spot={spot} />
          ))
        ) : (
          <p>Loading spots...</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
