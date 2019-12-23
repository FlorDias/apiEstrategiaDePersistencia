'use strict';
module.exports = (sequelize, DataTypes) => {
  const carrera = sequelize.define('carrera', {
    nombre: DataTypes.STRING
  }, {});
  carrera.associate = function(models) {
  	carrera.hasMany(models.materia,
    // associations can be defined here
    {
      as: 'materia',
      foreignKey: 'relacion2_carrera'
    })
  };
  return carrera;
};