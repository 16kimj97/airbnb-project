'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Spot extends Model {
        static associate(models) {
          Spot.belongsTo(models.User, {
            foreignKey: 'ownerId',
            onDelete: 'CASCADE'
          });

          Spot.hasMany(models.Review, {
            foreignKey: 'spotId',
            onDelete: 'CASCADE',
            hooks: true
          });

          Spot.hasMany(models.Booking, {
            foreignKey: 'spotId',
            onDelete: 'CASCADE',
            hooks: true
          });

          Spot.hasMany(models.SpotImage, {
            foreignKey: 'spotId',
            onDelete: 'CASCADE',
            hooks: true
        });
    }
}


  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
        type: DataTypes.DECIMAL,
        validate: {
          min: -90,
          max: 90
        }
      },
      lng: {
        type: DataTypes.DECIMAL,
        validate:{
          min: -180,
          max: 180
        }
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(7,2),
        validate:{
          min: 0
        }
      }
  }, {
    sequelize,
    modelName: 'Spot',
  });

  return Spot;
};
