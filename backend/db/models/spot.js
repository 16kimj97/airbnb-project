'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here with User model
      Spot.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    }
  }

  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
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
