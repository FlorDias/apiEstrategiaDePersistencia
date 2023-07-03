"use strict";
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define("materia", {
    nombre: DataTypes.STRING,
  });
  materia.associate = (models) => {
    materia.belongsTo(models.profesorMateria, {
      foreign_key: "materia_id",
    });
  };

  return materia;
};
