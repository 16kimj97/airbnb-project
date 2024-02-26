'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SpotImage extends Model {
        static associate(models) {
<<<<<<< HEAD
          SpotImage.belongsTo(models.Spot, {
=======
          SpotImage.belongsTo(models.Spots, {
>>>>>>> main
            foreignKey: 'spotId',
            onDelete: 'CASCADE'
        });
    }
}

  SpotImage.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Spots',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'SpotImage',
  });

  return SpotImage;
};
