'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Date extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Date.init({
    dayNumber: DataTypes.INTEGER,
    dayName: DataTypes.STRING,
    monthNumber: DataTypes.INTEGER,
    monthName: DataTypes.STRING,
    year: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Date',
  });
  return Date;
};