"use strict";
module.exports = (sequelize, DataTypes) => {
  const alumnoMateria = sequelize.define("alumnoMateria", {
    alumno_id: DataTypes.INTEGER,
    materia_id: DataTypes.INTEGER,
  });
  alumnoMateria.associate = function (models) {
    this.belongsTo(models.alumno, {
      foreign_key: "alumno_id",
    });
    this.belongsTo(models.materia, {
      foreignKey: "materia_id",
    });
  };

  return alumnoMateria;
};
