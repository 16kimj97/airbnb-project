const express = require('express');
const { Spots, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateSpot = [
    check('address').notEmpty().withMessage('Street address is required'),
    check('city').notEmpty().withMessage('City is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('lat').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be within -90 and 90'),
    check('lng').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be within -180 and 180'),
    check('name').isLength({ max: 50 }).withMessage('Name must be less than 50 characters'),
    check('description').notEmpty().withMessage('Description is required'),
    check('price').isFloat({ min: 0 }).withMessage('Price per day must be a positive number'),
    handleValidationErrors
];


// GET ALL SPOTS
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    if (!page || isNaN(parseInt(page))) {
        page = 1;
    }
    if (!size || isNaN(parseInt(size))) {
        size = 20;
    }

    const offset = (page - 1) * size;
    const limit = parseInt(size);

    const whereConditions = {};

    if (minLat && maxLat) {
        whereConditions.lat = { [Op.between]: [parseFloat(minLat), parseFloat(maxLat)] };
    }
    if (minLng && maxLng) {
        whereConditions.lng = { [Op.between]: [parseFloat(minLng), parseFloat(maxLng)] };
    }
    if (minPrice !== undefined && maxPrice !== undefined) {
        whereConditions.price = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
    }

    const spots = await Spots.findAll({
        where: whereConditions,
        include: {
            model: SpotImage,
            required: false
        },
        limit: limit,
        offset: offset
    });

    const spotsData = spots.map(spot => {
        const spotJson = spot.toJSON();

        return spotJson;
    });

    for (let spot of spotsData) {
        const reviewsCount = await Review.count({
            where: { spotId: spot.id }
        });

        if (reviewsCount > 0) {
            const totalStars = await Review.sum('stars', {
                where: { spotId: spot.id }
            });
            spot.avgRating = (totalStars / reviewsCount).toFixed(1);
        } else {
            spot.avgRating = "No ratings yet";
        }
        const previewImageObject = spot.SpotImages.find(img => img.preview === true);

        if (previewImageObject) {
            spot.previewImage = previewImageObject.url;
        } else {
            spot.previewImage = null;
        }
        delete spot.SpotImages;
    }

    res.status(200).json({
        Spots: spotsData,
        page: parseInt(page),
        size: parseInt(size)
    });
});

router.post('/', requireAuth, validateSpot, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ message: "Validation error", errors: errors.array() });
    }

    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const newSpot = await Spots.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(201).json(newSpot);
});

//ADD IMAGE TO SPOT BASED ON SPOT ID
router.post('/:spotId/images', requireAuth, async (req, res) =>{
    const spot = await Spots.findByPk(req.params.spotId);
    if (spot.ownerId !== req.user.id) {
        return res.status(404).json({ message: "Spot couldn't be found"} )
    }

    const { url, preview } = req.body;
    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    return res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview,
    })
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {

        const spots = await Spots.findAll({
            where: { ownerId: req.user.id },
            include: {
                model: SpotImage,
                where: { preview: true },
                required: false
            }
        });

        let spotsData = spots.map(spot => spot.toJSON());

        for (let spot of spotsData) {
            const reviewsCount = await Review.count({
                where: { spotId: spot.id }
            });

            if (reviewsCount > 0) {
                const totalStars = await Review.sum('stars', {
                    where: { spotId: spot.id }
                });
                spot.avgRating = (totalStars / reviewsCount).toFixed(1);
            } else {
                spot.avgRating = "No ratings yet";
            }

            const previewImageObject = spot.SpotImages.find(img => img.preview === true);

            if (previewImageObject) {
                spot.previewImage = previewImageObject.url;
            } else {
                spot.previewImage = null;
            }
            delete spot.SpotImages;
        }

        res.json({ Spots: spotsData });
});

//Get details for a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spots.findByPk(spotId, {
        include: [
            { model: SpotImage },
            { model: Review },
            { model: User }
        ]
    });

    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    let ownerId, firstName, lastName;

    if (spot.User) {
        ownerId = spot.User.id;
        firstName = spot.User.firstName;
        lastName = spot.User.lastName;
    }

    const numReviews = await Review.count({
        where: { spotId: spot.id }
    });

    let avgStarRating;

    if (numReviews > 0) {
        const totalStars = await Review.sum('stars', {
            where: { spotId: spot.id }
        });
        avgStarRating = (totalStars / numReviews).toFixed(1);
    } else {
        avgStarRating = "No ratings yet";
    }

    const spotDetails = {
        id: spot.id,
        ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews,
        avgStarRating,
        SpotImages: spot.SpotImages.map(image => ({ id: image.id, url: image.url, preview: image.preview })),
        Owner: {
            id: ownerId,
            firstName,
            lastName
        }
    };

    res.json(spotDetails);
});

//Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res)=> {
    const spotId = req.params.spotId;

    const spot = await Spots.findByPk(spotId);

    if (!spot){
        return res.status(404).json({message: "Spot couldn't be found"});
    }

    await spot.update(req.body);
    const updatedSpot = await Spots.findByPk(spotId);

    const spotDetails =  {
        id: updatedSpot.id,
        ownerId: updatedSpot.ownerId,
        address: updatedSpot.address,
        city: updatedSpot.city,
        state: updatedSpot.state,
        country: updatedSpot.country,
        lat: updatedSpot.lat,
        lng: updatedSpot.lng,
        name: updatedSpot.name,
        description: updatedSpot.description,
        price: updatedSpot.price,
        createdAt: updatedSpot.createdAt,
        updated: updatedSpot.updatedAt
    };
    res.json(spotDetails)
});

//Delete a spot
router.delete  ('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spots.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found"})
    }

    if (spot.ownerId !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this spot" });
    }


    await spot.destroy()
    res.status(200).json( {message: "Successfully deleted"} )
});

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    const spot = await Spots.findByPk(spotId);

    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    }

    const existingReview = await Review.findOne({
        where: {
            spotId: spotId,
            userId: userId
        }
    });

    if (existingReview){
        return res.status(403).json({ message: "User already has a review for this spot" })
    }

    const {review, stars} = req.body;
    if (!review) {
        return res.status(400).json( {message: "Review text is required"} );
    };
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
        return res.status(400).json( { message: "Stars must be a integer from 1 to 5 "})
    };

    const newReview = await Review.create({
        userId: userId,
        spotId: spotId,
        review: review,
        stars: stars
    });

    res.json(newReview)
});

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId;

    const spot = await Spots.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const reviews = await Review.findAll({
        where: { spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    const formattedReviews = reviews.map(review => review.toJSON());

    res.json({ Reviews: formattedReviews });
});

//Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;
    const userId = req.user.id;

    const startDateValidation = new Date(startDate);
    const today = new Date();
    if (startDateValidation < today) {
        return res.status(400).json({ message: 'startDate cannot be in the past' });
    }

    const endDateValidation = new Date(endDate);
    const startDateValidationCheck = new Date(req.body.startDate);
    if (endDateValidation <= startDateValidationCheck) {
        return res.status(400).json({ message: 'endDate cannot be on or before startDate' });
    }

    const spot = await Spots.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }

    if (spot.ownerId === userId) {
        return res.status(403).json({ message: "Users cannot book their own spots" });
    }

    const bookings = await Booking.findAll({
        where: { spotId }
    });

    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    for (let booking of bookings) {
        const oldStartDate = new Date(booking.startDate);
        const oldEndDate = new Date(booking.endDate);

        if (newStartDate <= oldEndDate && newEndDate >= oldStartDate) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
            });
        }
    }

    const createdBooking = await Booking.create({
        userId,
        spotId,
        startDate: newStartDate,
        endDate: newEndDate
    });

    res.json(createdBooking);
});

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

        const spot = await Spots.findByPk(spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        if (spot.ownerId === userId) {
            const bookings = await Booking.findAll({
                where: { spotId },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            });

            return res.status(200).json({ Bookings: bookings });
        } else {
            const bookings = await Booking.findAll({
                where: { spotId },
                attributes: ['spotId', 'startDate', 'endDate']
            });
            res.json({ Bookings: bookings });
        }
});



module.exports = router;
