'use strict';

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2024-04-10',
        endDate: '2024-04-15',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        userId: 4,
        startDate: '2024-05-05',
        endDate: '2024-05-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 4,
        userId: 5,
        startDate: '2024-06-20',
        endDate: '2024-06-25',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        userId: 1,
        startDate: '2024-07-01',
        endDate: '2024-07-05',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        startDate: { [Op.in]: ['2024-07-01','2024-06-20', '2024-05-05','2024-04-10','2024-03-15'] },
      },
      {}
    );
  },
};
