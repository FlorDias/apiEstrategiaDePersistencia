"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class materia extends Model {
    static associate(models) {
      this.belongsTo(models.carrera, { // una materia pertenece a una carrera
        as: "carrera_id", // nombre de mi relacion
        foreignKey: "id", // campo con el que voy a igualar
      });
    }
  }
  materia.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "materia",
    }
  );
  return materia;
};
