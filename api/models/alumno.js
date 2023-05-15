'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    dni: DataTypes.INTEGER
  }, {});
  alumno.associate = function(models) {
    this.belongsTo(models.carrera,{  // una alumno pertenece a una carrera
      as : 'Carrera-Relacionada',  // nombre de mi relacion
      foreignKey: 'id'     // campo con el que voy a igualar
    })
  };
  return alumno;
};