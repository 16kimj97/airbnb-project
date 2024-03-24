'use strict';
const { Spots } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spots.bulkCreate(
      [
        {
          ownerId: 1,
          address: "123 Kaido Lane",
          city: "Onigashima",
          state: "The Flower Capital",
          country: "Wano",
          lat: 37.7749,
          lng: -122.4194,
          name: "Sakura Home",
          description: "Beautiful Flower Retreat in Liberated Wano.",
          price: 75.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 2,
          address: "456 Little Road",
          city: "Balsa",
          state: "DressRosa",
          country: "New World",
          lat: 40.7128,
          lng: -74.0060,
          name: "Desert Oasis",
          description: "Home in the land of Love and Passion",
          price: 150.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 3,
          address: "789 Riverside Lane",
          city: "Aqua Laguna",
          state: "Water 7",
          country: "New World",
          lat: 34.0522,
          lng: -118.2437,
          name: "Seaside Retreat",
          description: "Apartment in the oceanic metropolis of Water 7.",
          price: 100.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 1,
          address: "544 Desert Lane",
          city: "Alubarna",
          state: "Oasis",
          country: "Arabasta",
          lat: 54.11565,
          lng: -106.8856,
          name: "Magic House",
          description: "A warm retreat in the oasis of a kingdom that is known as Arabasta.",
          price: 520.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 2,
          address: "242 Tactics Lane",
          city: "Enies Lobby",
          state: "Judicial Island",
          country: "Grand Line",
          lat: 34.0522,
          lng: -118.2437,
          name: "Beautiful home in the judicial capital",
          description: "Nearby the famous Impel Down Prison and the Infamous Navy HQ!",
          price: 60.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 3,
          address: "895 Cloud Street",
          city: "Skypeia",
          state: "White-White Sea",
          country: "United Sky",
          lat: 34.0522,
          lng: -118.2437,
          name: "Cozy cloud suite",
          description: "Famously located island in the sky! Reaching island may be difficuly so is required that you have a flying boat.",
          price: 620.99,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(
      'Spots',
      {
        address: {
          [Op.in]: [
            "123 Main St",
            "456 Elm St",
            "789 Oak St",
            "544 Summoners Rift",
            "242 Tactics Lane",
            "895 Dust Road"
          ]
        },
      },
      {}
    );
  }
};
