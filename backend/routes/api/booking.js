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



  router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }
        if (booking.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission to edit this booking" });
        }

        const today = new Date();
        if (new Date(booking.endDate) < today) {
            return res.status(403).json({ message: "Past bookings can't be modified" });
        }

        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);

        if (newStartDate < today) {
            return res.status(400).json({ message: 'startDate cannot be in the past' });
        }

        if (newEndDate <= newStartDate) {
            return res.status(400).json({ message: 'endDate cannot be on or before startDate' });
        }

        const existingBookings = await Booking.findAll({
            where: {
                spotId: booking.spotId,
                id: { [Op.ne]: booking.id }
            }
        });

        for (let existingBooking of existingBookings) {
            const existingStart = new Date(existingBooking.startDate);
            const existingEnd = new Date(existingBooking.endDate);

            if (newStartDate <= existingEnd && newEndDate >= existingStart) {
                return res.status(403).json({
                    message: "Sorry, this spot is already booked for the specified dates",
                    errors: {
                        startDate: "Start date conflicts with an existing booking",
                        endDate: "End date conflicts with an existing booking"
                    }
                });
            }
        }

        await booking.update({
            startDate: newStartDate,
            endDate: newEndDate
        });

        res.status(200).json(booking);
});


router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

        const booking = await Booking.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking couldn't be found" });
        }

        const spot = await Spots.findByPk(booking.spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot with booking couldn't be found" });
        }
        if (spot.ownerId !== userId && booking.userId !== userId) {
            return res.status(403).json({ message: "You do not have permission to delete this booking" });
        }

        const today = new Date();
        if (new Date(booking.startDate) <= today) {
            return res.status(403).json({ message: "Bookings that have been started can't be deleted" });
        }
        await booking.destroy();

        res.json({ message: "Successfully deleted" });
});





module.exports = router;
