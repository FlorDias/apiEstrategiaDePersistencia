"use strict";
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    "carrera",
    {
      nombre: DataTypes.STRING,
    });
  carrera.associate = (models) => {
    carrera.hasMany(models.materia, {
      foreignKey: 'carrera_id'
    });
  };
  return carrera;
};
