"use strict";
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define(
    "profesor",
    {
      nombre: DataTypes.STRING,
    },
    {}
  );
  return profesor;
};
