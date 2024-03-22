import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSpotByUserId } from '../../spots';
import SpotTile from '../LandingPage/SpotTile'
import './ManageSpot.css'
import { useNavigate } from 'react-router-dom'

const ManageSpotPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spots = useSelector((state) => Object.values(state.spots.spots));
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            dispatch(getSpotByUserId(user.id));
        }
    }, [user, dispatch]);

    const flattenedSpots = spots.flat();

    const isSpotEmpty = () => flattenedSpots.length === 0;

    return (
        <div>
            <h1>Manage Your Spots</h1>
            {!isSpotEmpty() ? (
                <div className="spot-list">
                    {flattenedSpots.map(spot => (
                        <div key={spot.id}>
                            <SpotTile spot={spot} />
                            <button
                                className="update-spot-button"
                                onClick={() => navigate(`/spots/${spot.id}/edit`)}
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-spots-message">
                    <p>No spots have been posted yet.</p>
                    <button
                      className="create-new-spot-button"
                      onClick={() => navigate('/spots/new')}
                    >
                        Create a New Spot
                    </button>
                </div>
            )}
        </div>
    );
};

export default ManageSpotPage;
