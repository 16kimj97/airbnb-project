import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSpotByUserId } from '../../spots';
import SpotTile from '../LandingPage/SpotTile'

const ManageSpotPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const spots = useSelector((state) => Object.values(state.spots.spots));

    console.log(spots);


    useEffect(() => {
        if (user) {
            dispatch(getSpotByUserId(user.id));
        }
    }, [user, dispatch]);

    const flattenedSpots = spots.flat();

    return (
        <div>
            <h1>Manage Your Spots</h1>
            <div className="spot-list">
                {flattenedSpots.map(spot => (
                    <SpotTile key={spot.id} spot={spot} />
                ))}
            </div>
        </div>
    );
};

export default ManageSpotPage;
