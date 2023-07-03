"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define("profesor", {
    nombre: DataTypes.STRING,
  });
  profesor.associate = (models) => {
    profesor.belongsTo(models.profesorMateria, {
      foreign_key: "profesor_id",
    });
  };
  return profesor;
};
