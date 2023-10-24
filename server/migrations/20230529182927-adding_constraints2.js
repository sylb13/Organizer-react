"use strict";
const { QueryTypes } = require("sequelize/dist");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.addConstraint("MatterUsers", {
        fields: ["matterId"],
        type: "foreign key",
        name: "matter_users_matter_id_association",
        references: {
          table: "Matters",
          field: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
      await queryInterface.addConstraint("MatterUsers", {
        fields: ["userId"],
        type: "foreign key",
        name: "matter_users_user_id_association",
        references: {
          table: "Users",
          field: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.removeConstraint(
        "MatterUsers",
        "matter_users_matter_id_association"
      ),
      await queryInterface.removeConstraint(
        "MatterUsers",
        "matter_users_user_id_association"
      ),
    ]);
  },
};
