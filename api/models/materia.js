'use strict';
module.exports = (sequelize, DataTypes) => {
  const materia = sequelize.define('materia', {
    nombre: DataTypes.STRING,
    relacion2_carrera: DataTypes.INTEGER,
    
  }, { }
  );
  materia.associate = function(models) {
  	materia.belongsTo(models.carrera
    // associations can be defined here
    ,{
      as : 'carrera',
      foreignKey: 'relacion2_carrera'
    })
  };
  return materia;
};