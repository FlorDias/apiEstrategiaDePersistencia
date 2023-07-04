"use strict";
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define("materia", {
    nombre:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  materia.associate = (models) => {
    materia.belongsTo(models.profesorMateria, {
      foreign_key: "materia_id",
    });
  };

  return materia;
};
