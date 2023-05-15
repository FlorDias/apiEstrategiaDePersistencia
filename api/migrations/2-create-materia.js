"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("materia", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING,
      },
      duracion: {
        type: Sequelize.INTEGER,
      },
      carreraId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "carrera",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("materia");
  },
};
