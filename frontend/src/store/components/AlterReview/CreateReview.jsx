import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview } from '../../review';
import { useModal } from '../../../context/Modal';
import './CreateReview.css';

const CreateReviewForm = ({ spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const user = useSelector((state) => state.session.user);
    const [showButton, setShowButton] = useState(true)

    const disabled = reviewText.length < 10 || rating === 0;

    const handleStarClick = (starValue) => {
        setRating(starValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewPayload = {
            review: reviewText,
            stars: rating,
            spotId: spot.id,
        };
        try {
            await dispatch(createReview(reviewPayload, spot.id));
            closeModal();
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    useEffect(() => {
        if (user && spot && Array.isArray(spot.reviews)) {
            const hasPostedReview = spot.reviews.some(review => review.userId === user.id);
            setShowButton(!hasPostedReview);
        }
    }, [user, spot]);


    return (
        <div className="create-review-form">
        <h2>How was your stay?</h2>
        <form onSubmit={handleSubmit}>
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((starValue) => (
                    <button
                        type="button"
                        key={starValue}
                        className={`star ${starValue <= rating ? 'on' : ''}`}
                        onClick={() => handleStarClick(starValue)}
                    >
                        <i className="fas fa-star"></i>
                    </button>
                ))}
                <span className="star-text">Stars</span>
            </div>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Leave your review here..."
                ></textarea>
                {showButton && (
                    <button
                        type="submit"
                        className={`submit-btn ${disabled ? 'hidden' : ''}`}
                        disabled={disabled}
                    >
                        Submit Your Review
                    </button>
                )}
            </form>
        </div>
    );
};

export default CreateReviewForm;
