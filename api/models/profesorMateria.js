"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesorMateria = sequelize.define("profesorMateria", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    materia_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  profesorMateria.associate = function (models) {
    this.belongsTo(models.profesor, {
      foreign_key: "profesor_id",
    });
    this.belongsTo(models.materia, {
      foreign_key: "materia_id",
    });
  };

  return profesorMateria;
};
