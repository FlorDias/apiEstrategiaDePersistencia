"use strict";
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define("alumno", {
    nombre: DataTypes.STRING,
    matricula: DataTypes.INTEGER,
    carrera_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER,
  });
  alumno.associate = function (models) {
    this.belongsTo(models.carrera, {
      foreignKey: "carrera_id",
    });
    this.belongsTo(models.usuario, {
      foreignKey: "usuario_id",
    });
    this.hasMany(models.alumnoMateria,{
      foreignKey: "alumno_id",
    });
  };

  return alumno;
};
