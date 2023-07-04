"use strict";
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define("usuario", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, Infinity],
          msg: "La contraseña debe tener al menos 8 caracteres",
        },
      },
    },
  });
  usuario.associate = (models) => {
    usuario.hasOne(models.alumno, {
      foreignKey: "usuario_id",
    });
  };
  return usuario;
};
