const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

        const image = await SpotImage.findByPk(imageId);
        if (!image) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }

        const spot = await Spots.findByPk(image.spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot associated with the image couldn't be found" });
        }

        if (spot.ownerId !== userId) {
            return res.status(403).json({ message: "You do not have permission to delete this spot image" });
        }

        await image.destroy();

        res.json({ message: "Successfully deleted" });
});








module.exports = router;
