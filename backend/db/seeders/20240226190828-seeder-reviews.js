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
          spotId: 1,
          userId: 1,
          review: "Great spot! Really enjoyed my stay.",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 2,
          userId: 2,
          review: "Average place, could use some improvements.",
          stars: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 3,
          userId: 3,
          review: "Lovely location, highly recommended!",
          stars: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 4,
          userId: 4,
          review: "Not satisfied with the cleanliness.",
          stars: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          spotId: 5,
          userId: 5,
          review: "Fantastic experience, will definitely come back!",
          stars: 5,
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
        review: { [Op.in]: ["Great spot! Really enjoyed my stay.","Average place, could use some improvements.", "Lovely location, highly recommended!","Not satisfied with the cleanliness.","Fantastic experience, will definitely come back!"] },
      },
      {}
    );
  },
};
