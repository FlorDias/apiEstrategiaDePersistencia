"use strict";
module.exports = (sequelize, DataTypes) => {
  const alumnoMateria = sequelize.define(
    "alumnoMateria",
    {
     
    },
    {}
  );
  alumnoMateria.associate = function (models) {
    this.belongsTo(models.alumno, { as: "alumno_id", foreignKey: "id" });
  };
  alumnoMateria.associate = function (models) {
    this.hasMany(models.materia, { as: "materia_id", foreignKey: "id" });
  };
  return alumnoMateria;
};
