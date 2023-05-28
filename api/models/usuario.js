"use strict";
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define("usuario", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });
  usuario.associate = (models) => {
    usuario.hasMany(models.materia, {
      foreignKey: "usuario_id",
    });
  };
  return usuario;
};
