const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


router.get('/current', requireAuth, async (req, res) => {
      const userId = req.user.id;

      const bookings = await Booking.findAll({
        where: { userId: userId },
        include: [{
          model: Spots,
          include: [{
            model: SpotImage,
            where: { preview: true },
            required: false
          }]
        }]
      });

        const bookingsData = bookings.map(booking => {
        const bookingJson = booking.toJSON();
        const spotData = bookingJson.Spot;
        if (spotData.SpotImages && spotData.SpotImages.length > 0) {
          spotData.previewImage = spotData.SpotImages[0].url;
        } else {
          spotData.previewImage = null;
        }
        delete spotData.SpotImages;
        return bookingJson;
      });

      res.json({ Bookings: bookingsData });
  });










module.exports = router;
