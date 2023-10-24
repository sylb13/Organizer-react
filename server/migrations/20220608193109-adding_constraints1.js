"use strict";

const { QueryTypes } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("Matters", {
        fields: ["alertId"],
        type: "foreign key",
        name: "matter_alert_association",
        references: {
          table: "Alerts",
          field: "id",
        },
      }),
      // await queryInterface.addConstraint("Alerts", {
      //   fields: ["matterId"],
      //   type: "foreign key",
      //   name: "alert_matter_association",
      //   references: {
      //     table: "Matters",
      //     field: "id",
      //   },
      // }),
      // await queryInterface.addConstraint("Alerts", {
      //   fields: ["userId"],
      //   type: "foreign key",
      //   name: "alert_user_association",
      //   references: {
      //     table: "Users",
      //     field: "id",
      //   },
      // }),
      await queryInterface.addConstraint("Matters", {
        fields: ["toDoListId"],
        type: "foreign key",
        name: "matter_todolist_association",
        references: {
          table: "ToDoLists",
          field: "id",
        },
      }),
      await queryInterface.addConstraint("ToDoListItems", {
        fields: ["toDoListId"],
        type: "foreign key",
        name: "todolistitem_todolist_association",
        references: {
          table: "ToDoLists",
          field: "id",
        },
      }),
      await queryInterface.addConstraint("ToDoLists", {
        fields: ["matterId"],
        type: "foreign key",
        name: "todolist_matter_association",
        references: {
          table: "Matters",
          field: "id",
        },
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint(
        "ToDoLists",
        "todolist_matter_association"
      ),
      await queryInterface.removeConstraint(
        "ToDoListItems",
        "todolistitem_todolist_association"
      ),
      await queryInterface.removeConstraint(
        "Matters",
        "matter_todolist_association"
      ),
      // await queryInterface.removeConstraint("Alerts", "alert_user_association"),
      // await queryInterface.removeConstraint(
      //   "Alerts",
      //   "alert_matter_association"
      // ),
      await queryInterface.removeConstraint(
        "Matters",
        "matter_alert_association"
      ),
    ]);
  },
};
