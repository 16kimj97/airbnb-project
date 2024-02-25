'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {

          Booking.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE'
          });

          Booking.belongsTo(models.Spot, {
            foreignKey: 'spotId',
            onDelete: 'CASCADE'
        });
    }
}


  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        checkDate(date) {
          let today = new Date();
          today.setHours(0, 0, 0, 0); //set the time to earliest possible so no weirdness on same day
          let start = new Date(date);
          if (start < today) {
            throw new Error("startDate can't be in past");
          }
        }
      }
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        checkDate(date) {
          if (this.startDate && this.startDate > date) {
            throw new Error("endDate can't be before startDate");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });

  return Booking;
};
