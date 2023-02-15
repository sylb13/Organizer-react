"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ToDoListItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ToDoListItem.init(
    {
      content: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
      toDoListId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ToDoListItem",
    }
  );
  return ToDoListItem;
};
