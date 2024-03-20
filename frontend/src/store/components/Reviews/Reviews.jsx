import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from '../../review';
import './Reviews.css'

const GetSpotReviews = ({ spot }) => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.session);
    const reviews = useSelector(state => {return state.reviewState})

    useEffect(() => {
        if (spot && spot.id) {
            dispatch(getAllReviews(spot.id));
        }
    }, [dispatch, spot?.id]);

    let rating = parseFloat(spot?.avgStarRating).toFixed(1);
    rating = isNaN(rating) ? "New" : rating;

    let reviewsArray = reviews ? Object.values(reviews) : [];
    let currRevArr = reviewsArray.filter(review => review.spotId === spot?.id);
    currRevArr.forEach(review => {
        review.newDate = formatReviewDate(review.createdAt);
    });

    let reviewCountText = numReviewToText(spot?.numReviews || 0);

    return (
        <>
            <div className='spot-details-review-header'>
                <div className='star-rating-review'>
                    <p>{rating} <i className="fas fa-star"></i> {reviewCountText}</p>
                </div>
            </div>
            <div className='reviews-container'>
                {currRevArr.map(review => (
                    <div key={review?.id}>
                        <p className='spot-details-firstName'>{review.User?.firstName}</p>
                        <p className='spot-details-date'>{review?.newDate}</p>
                        <p className='spot-details-review'>{review?.review}</p>
                    </div>
                ))}
                {currRevArr.length === 0 && (
                    <p>Be the first to post a review!</p>
                )}
            </div>
        </>
    );
};

const numReviewToText = numReviews => {
    if (numReviews === 1) return '• 1 Review';
    if (numReviews > 1) return `• ${numReviews} Reviews`;
    return '';
};

const formatReviewDate = dateString => {
    let date = new Date(dateString).toDateString();
    let month = date.slice(4, 7);
    let year = new Date(dateString).getFullYear();
    return `${month} ${year}`;
};

export default GetSpotReviews;
