const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

        const image = await ReviewImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: "Review Image couldn't be found" });
        }
        const review = await Review.findByPk(image.reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review associated with the image couldn't be found" });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission to delete this review image" });
        }
        await image.destroy();
        res.status(200).json({ message: "Successfully deleted" });
});




module.exports = router;
