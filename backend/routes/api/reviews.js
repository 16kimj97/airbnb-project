const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    let userId = req.user.id
    const review = await Review.findByPk(reviewId);

    if(review.userId !== userId){
        return res.status(403).json({"message": "Forbidden"})
    }

    if (!review){
        return res.status(404).json({ message: "Review couldn't be found" });
    }

    const numImages = await ReviewImage.count({ where: { reviewId: reviewId } });
    if (numImages >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this review was reached"});
    }

    const imageUrl = req.body.url;

    const image = await ReviewImage.create({ url: imageUrl, reviewId });
    res.json({ id: image.id, url: image.url });
});

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
        const userId = req.user.id;

        const reviews = await Review.findAll({
            where: { userId },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: Spots,
                    attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                    include: [
                        {
                            model: SpotImage,
                            where: { preview: true },
                            required: false,
                            attributes: ['url']
                        }
                    ]
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }
            ]
        });
        const dataReviews = reviews.map(review => review.toJSON());

        for (let review of dataReviews) {
            if (review.Spot.SpotImages.length > 0) {
                review.Spot.previewImage = review.Spot.SpotImages[0].url;
            } else {
                review.Spot.previewImage = null;
            }
            delete review.Spot.SpotImages;
    };
    res.json({ Reviews: dataReviews });
});

//Edit a review
router.put('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission" });
        }

        await review.update(req.body);
        const updatedReview = await Review.findByPk(reviewId);

        const reviewDetails = {
            id: updatedReview.id,
            userId: updatedReview.userId,
            spotId: updatedReview.spotId,
            review: updatedReview.review,
            stars: updatedReview.stars,
            createdAt: updatedReview.createdAt,
            updatedAt: updatedReview.updatedAt
        };

        res.status(200).json(reviewDetails);
});

//Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user.id;

        const review = await Review.findByPk(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review couldn't be found" });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ message: "Forbidden: You do not have permission to delete this review" });
        }

        await review.destroy();

        res.status(200).json({ message: "Successfully deleted" });
});



module.exports = router;
