import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSpotByUserId } from '../../spots';
import SpotTile from '../LandingPage/SpotTile'
import './ManageSpot.css'
import { useNavigate } from 'react-router-dom'
import DeleteSpotForm from "../DeleteSpot/DeleteSpot";
import { useModal } from '../../../context/Modal';


const ManageSpotPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spots = useSelector((state) => Object.values(state.spots.spots));
    const navigate = useNavigate();
    const { setModalContent, setOnModalClose } = useModal();

    useEffect(() => {
        if (user) {
            dispatch(getSpotByUserId(user.id));
        }
    }, [user, dispatch]);

    const flattenedSpots = spots.flat();

    const isSpotEmpty = () => flattenedSpots.length === 0;

    const handleDeleteButtonClick = (spotId) => {
        // Open the modal with DeleteSpotForm component
        setOnModalClose(null);
        setModalContent(
            <DeleteSpotForm
                spotId={spotId}
                onModalClose={() => setModalContent(null)}
            />
        );
    };

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
                            <button
                                className="delete-spot-button"
                                onClick={() => handleDeleteButtonClick(spot.id)}
                            >
                                Delete
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
