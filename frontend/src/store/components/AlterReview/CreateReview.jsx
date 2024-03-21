import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../review';
import { useModal } from '../../../context/Modal';
import './CreateReview.css';

const CreateReviewForm = ({ spot }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

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

    return (
        <div className="create-review-form">
            <h2>Write a Review</h2>
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
                </div>
                <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review here..."
                ></textarea>
                <button type="submit" className="submit-btn">Submit Review</button>
            </form>
        </div>
    );
};

export default CreateReviewForm;
