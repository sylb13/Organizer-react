"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Matters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      isDone: {
        type: Sequelize.BOOLEAN,
      },
      startDate: {
        type: Sequelize.STRING,
      },
      endDate: {
        type: Sequelize.STRING,
      },
      startTime: {
        type: Sequelize.STRING,
      },
      endTime: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      dateId: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      toDoListId: {
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.INTEGER,
      },
      alertId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Matters");
  },
};
