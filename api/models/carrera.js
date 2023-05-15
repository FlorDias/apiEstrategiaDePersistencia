"use strict";
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define(
    "carrera",
    {
      nombre: DataTypes.STRING,
    },
    {}
  );
  carrera.associate = function (models) {
    this.hasMany( // una carrera tiene muchas materias
      models.materia,
      {
        as: "materia", // nombre de mi relacion
        foreignKey: "id", // campo con el que voy a igualar
      }
    );
  };

  return carrera;
};
