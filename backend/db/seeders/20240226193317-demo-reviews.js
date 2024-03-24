'use strict';

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 2,
          userId: 1,
          review: "The city has become much better after being liberated! One of the best stays I have experienced.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          userId: 1,
          review: "The suite itself was great, but having to use boats to get around the city really made me seasick.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          userId: 1,
          review: "Awesome place! Was great exploring the infamous impel down on a tour!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 6,
          userId: 1,
          review: "Worst stay I have ever experienced! How do you expect me to fly up to a floating island?!!",
          stars: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          userId: 2,
          review: "The most beautiful city I have ever visited. The sakura petals were in full bloom and had the most delicious oden!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          userId: 2,
          review: "Reminds me of venice! great Stay!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          userId: 2,
          review: "Man is it hot over here, i couldn't even breath without the A/C",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 6,
          userId: 2,
          review: "It is a bit difficult to get up here without flying, but once you do it's beatiful!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 1,
          userId: 3,
          review: "A bit dangerous! I hear there is a dragon living in the city!",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 2,
          userId: 3,
          review: "The elves in the forest were a joy!",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 2,
          userId: 3,
          review: "The toys in the forest were a joy!",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          userId: 3,
          review: "Definately hot, but the culture here is amazing!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          userId: 3,
          review: "Besides Impel Down and the Navy HQ not much to see",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 7,
          userId: 3,
          review: "Impossible to find, won't even show on snail maps",
          stars: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: { [Op.in]: ["Great spot! Really enjoyed my stay.","Average place, could use some improvements.", "Lovely location, highly recommended!"] },
      },
      {}
    );
  },
};
