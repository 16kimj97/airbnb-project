'use strict';

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://i.postimg.cc/65dQr5hm/wano.png",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://i.postimg.cc/gj36LyJM/Dress-Rosa.jpg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://i.postimg.cc/90zCvc3y/water-7.jpg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            "https://i.postimg.cc/65dQr5hm/wano.png",
            "https://i.postimg.cc/gj36LyJM/Dress-Rosa.jpg",
            "https://i.postimg.cc/90zCvc3y/water-7.jpg",
          ]
        }
      },
      {}
    );
  }
}
