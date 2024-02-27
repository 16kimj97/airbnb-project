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
    return res.status(200).json({ id: image.id, url: image.url });
});

//Get all Reviews of the Current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: {userId: userId},
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
    })

    const returnedReviews = reviews.map(review => ({
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: review.User,
        Spot: {
            id: review.Spot.id,
            ownerId: review.Spot.ownerId,
            address: review.Spot.address,
            city: review.Spot.city,
            state: review.Spot.state,
            country: review.Spot.country,
            lat: review.Spot.lat,
            lng: review.Spot.lng,
            name: review.Spot.name,
            price: review.Spot.price,
            previewImage: review.Spot.SpotImages[0].url
          },

        ReviewImages: review.ReviewImages
    }));

    return res.json( {Reviews: returnedReviews})
});


module.exports = router;
