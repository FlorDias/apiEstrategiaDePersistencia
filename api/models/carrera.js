"use strict";
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define("carrera", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  carrera.associate = (models) => {
    carrera.hasMany(models.materia, {
      foreignKey: "carrera_id",
    });
    carrera.hasMany(models.alumno, {
      foreignKey: "carrera_id",
    });
  };
  return carrera;
};
