"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesorMateria = sequelize.define(
    "profesorMateria",
    {
     
    },
    {}
  );
  profesorMateria.associate = function (models) {
    //  alumnoMateria.associate = function (models) {
    this.belongsTo(models.profesor, { as: "profesor_id", foreignKey: "id" });
    this.hasMany(models.materia, { as: "materia_id", foreignKey: "id" });
  };
  return profesorMateria;
};
