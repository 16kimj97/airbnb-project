'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
        Review.belongsTo(models.User, {
          foreignKey: 'userId',
        });

        Review.belongsTo(models.Spots, {
          foreignKey: 'spotId',
        });

        Review.hasMany(models.ReviewImage, {
          foreignKey: 'reviewId',
          onDelete: 'CASCADE',
          hooks: true,
        });
      }
  }

  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
        isInt: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });

  return Review;
};
