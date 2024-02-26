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
          ownerId: 4,
          address: "101 Pine St",
          city: "NoTown",
          state: "NYC",
          country: "Timberland",
          lat: 41.8781,
          lng: -87.6298,
          name: "Rustic Cabin",
          description: "A rustic cabin nestled in the woods.",
          price: 80.00,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          ownerId: 5,
          address: "202 Maple St",
          city: "Gotham",
          state: "Batland",
          country: "Brotherland",
          lat: 51.5074,
          lng: -0.1278,
          name: "Urban Oasis",
          description: "An oasis in the middle of the city.",
          price: 120.00,
          createdAt: new Date(),
          updatedAt: new Date()
        }
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
        address: { [Op.in]: ["123 Main St", "456 Elm St", "789 Oak St", "101 Pine St", "202 Maple St"] },
      },
      {}
    );
  }
};
