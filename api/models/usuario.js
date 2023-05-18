"use strict";
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define(
    "usuario",
    {
      username: DataTypes.INTEGER,
      password: DataTypes.STRING,
    },
    {}
  );
  return usuario;
};
