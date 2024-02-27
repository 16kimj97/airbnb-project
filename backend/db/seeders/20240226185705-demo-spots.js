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
          address: "123 Main St",
          city: "Anytown",
          state: "Jury",
          country: "Oxen",
          lat: 37.7749,
          lng: -122.4194,
          name: "Cozy Cottage",
          description: "A charming cottage in the countryside.",
          price: 75.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 2,
          address: "456 Elm St",
          city: "Othertown",
          state: "North Sandrea",
          country: "Latimore",
          lat: 40.7128,
          lng: -74.0060,
          name: "Modern Loft",
          description: "A stylish loft in the heart of the city.",
          price: 150.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 3,
          address: "789 Oak St",
          city: "Whoville",
          state: "Creatin",
          country: "Portein",
          lat: 34.0522,
          lng: -118.2437,
          name: "Seaside Retreat",
          description: "A cozy retreat with ocean views.",
          price: 100.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 1,
          address: "544 Summoners Rift",
          city: "League",
          state: "Of",
          country: "Legends",
          lat: 54.11565,
          lng: -106.8856,
          name: "Magic House",
          description: "A magical house in the forest.",
          price: 520.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 2,
          address: "242 Tactics Lane",
          city: "Little",
          state: "Auto",
          country: "Chess",
          lat: 34.0522,
          lng: -118.2437,
          name: "Airport suite near downtown",
          description: "Charming apartment near airport",
          price: 60.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 3,
          address: "895 Dust Road",
          city: "Counter",
          state: "Strike",
          country: "Go",
          lat: 34.0522,
          lng: -118.2437,
          name: "Desert Battlegrounds",
          description: "A desert mansion.",
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
        address: { [Op.in]: ["123 Main St", "456 Elm St", "789 Oak St"] },
      },
      {}
    );
  }
};
