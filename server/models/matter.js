"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matter.init(
    {
      title: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      category: DataTypes.STRING,
      dateId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      toDoListId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      alertId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Matter",
    }
  );
  return Matter;
};
