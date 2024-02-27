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

    const review = await Review.findByPk(reviewId);

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
        const returnedReviews = reviews.map(review => {
            const formattedReview = review.toJSON();

            if (formattedReview.Spot.SpotImages.length > 0) {
                formattedReview.Spot.previewImage = formattedReview.Spot.SpotImages[0].url;
            } else {
                formattedReview.Spot.previewImage = null;
            }
            delete formattedReview.Spot.SpotImages;
            return formattedReview;
        });

        res.json({ Reviews: returnedReviews });
});





module.exports = router;
