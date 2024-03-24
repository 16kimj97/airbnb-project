import { useDispatch } from "react-redux";
import { deleteReview } from "../../review";

function DeleteReviewForm({ reviewId, onModalClose }) {
    const dispatch = useDispatch();

    const handleDeleteReview = async () => {
        try {
            await dispatch(deleteReview(reviewId));
            if (onModalClose) {
                onModalClose();
            }
            window.location.reload();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div className="confirmation-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete this review?</p>
            <div className="button-container">
                <button className="delete-button" type="button" onClick={handleDeleteReview}>
                    Yes (Delete Review)
                </button>
                <button className="cancel-button" type="button" onClick={onModalClose}>
                    No (Keep Review)
                </button>
            </div>
        </div>
    );
}

export default DeleteReviewForm;
