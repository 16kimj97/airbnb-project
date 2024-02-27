const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res)=> {
    const reviewId = req.params.reviewId;

    const review = await Review.findbyPk(reviewId);

    if (!review){
        return res.status(404).json({ message: "Review couldn't be found" })
    }

    const numImages = await ReviewImage.count({ where: { reviewId: reviewId } });
    if (numImages >= 10) {
        return res.status(403).json({ message: "Maximum number of images for this review was reached"})
    }

    const image = await ReviewImage.create({ url: imageUrl, reviewId });

    return res.json(image)
});


module.exports = router;
