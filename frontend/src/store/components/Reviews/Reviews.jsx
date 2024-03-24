import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllReviews } from '../../review';
import './Reviews.css'
import CreateReviewForm from '../AlterReview/CreateReview';
import OpenModalButton from '../OpenModelButton/OpenModelButton';
import DeleteReviewForm from  '../AlterReview/DeleteReview'
import { useModal } from '../../../context/Modal';


const GetSpotReviews = ({ spot }) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => {return state.reviews})
    const currentUser = useSelector(state => state.session.user);
    const [showCreateReviewButton, setShowCreateReviewButton] = useState(false);
    const { setModalContent, setOnModalClose } = useModal();
    const [userCanDeleteReview, setUserCanDeleteReview] = useState(false);

    useEffect(() => {
        if (spot && spot.id) {
            dispatch(getAllReviews(spot.id));
        }
    }, [dispatch, spot]);


    const handleDeleteButtonClick = (reviewId) => {
        setOnModalClose(null);
        setModalContent(
            <DeleteReviewForm
                reviewId={reviewId}
                onModalClose={() => setModalContent(null)}
            />
        );
    };

        let rating = parseFloat(spot.avgStarRating).toFixed(1);
    rating = isNaN(rating) ? "New" : rating;

    let reviewsArray = reviews ? Object.values(reviews) : [];
    let currRevArr = reviewsArray.filter(review => review.spotId === spot.id);
    currRevArr.forEach(review => {
        review.newDate = formatReviewDate(review.createdAt);
    });

    currRevArr.reverse();

    let reviewCountText = numReviewToText(spot.numReviews || 0);

    useEffect(() => {
        // console.log('currentUser:', currentUser);
        // console.log('spot:', spot);
        // console.log('reviews:', reviews);

        if (currentUser && spot) {
            const userOwnsSpot = spot.ownerId === currentUser.id;
            const userHasReviewed = currRevArr.some(review => review.userId === currentUser.id);
            // console.log('userOwnsSpot:', userOwnsSpot);
            // console.log('userHasReviewed:', userHasReviewed);

            setShowCreateReviewButton(!userOwnsSpot && !userHasReviewed);
            setUserCanDeleteReview(userHasReviewed);
        } else {
            setShowCreateReviewButton(false);
            setUserCanDeleteReview(false);
        }
    }, [currentUser, spot, reviews, currRevArr]);

    return (
        <>
            <div className='spot-details-review-header'>
                <div className='star-rating-review'>
                    <p>{rating} <i className="fas fa-star"></i> {reviewCountText}</p>
                </div>
                {showCreateReviewButton && (
                    <div className='spot-details-review-header'>
                        <OpenModalButton
                            className="create-review-button"
                            modalComponent={<CreateReviewForm spot={spot} />}
                            buttonText="Submit Review"
                        />
                    </div>
                )}
            </div>
            <div className='reviews-container'>
                {currRevArr.map(review => (
                    <div key={review?.id}>
                        <p className='spot-details-firstName'>{review.User.firstName}</p>
                        <p className='spot-details-date'>{review.newDate}</p>
                        <p className='spot-details-review'>{review.review}</p>
                        {userCanDeleteReview && review.userId === currentUser.id && (
                            <button
                                className="delete-review-button"
                                onClick={() => handleDeleteButtonClick(review.id)}
                            >
                                Delete
                            </button>
                        )}
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
