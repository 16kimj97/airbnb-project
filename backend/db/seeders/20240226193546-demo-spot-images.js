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
      {
        spotId: 4,
        url: "https://i.postimg.cc/90zCvc3y/water-7.jpg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 5,
        url: "https://i.postimg.cc/90zCvc3y/water-7.jpg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 6,
        url: "https://i.postimg.cc/90zCvc3y/water-7.jpg",
        preview: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: "https://i.postimg.cc/DzVV6FSV/wano-2.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 1,
        url: "https://i.postimg.cc/3R1m98Jn/wano-3.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        spotId: 1,
        url: "https://i.postimg.cc/jSBpdKTg/wano-4.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        spotId: 1,
        url: "https://i.postimg.cc/8k6Bq6Pr/wano-5.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://i.postimg.cc/Vs4Rm8Pj/dressrosa-2.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://i.postimg.cc/DZ0zGLmf/dressrosa-3.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://i.postimg.cc/vHNC89wL/dressrosa-4.png",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 2,
        url: "https://i.postimg.cc/x1WCmcML/dressrosa-5.png",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://i.postimg.cc/zXw6KfM4/water-2.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://i.postimg.cc/ZRCFYftJ/water-3.png",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://i.postimg.cc/Y0ScSB2h/water-4.jpg",
        preview: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        spotId: 3,
        url: "https://i.postimg.cc/MKk44BVn/water-5.jpg",
        preview: false,
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
