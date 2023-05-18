'use strict';
module.exports = (sequelize, DataTypes) => {
  const alumno = sequelize.define('alumno', {
    nombre: DataTypes.STRING,
    matricula: DataTypes.INTEGER
  }, {});

  alumno.associate = function(models) {
    this.belongsTo(models.carrera,{  // una alumno pertenece a una carrera
      as : 'carrera_id',  // nombre de mi relacion
      foreignKey: 'id'     // campo con el que voy a igualar
    })
  };
  alumno.associate = function(models) {
    this.belongsTo(models.carrera,{  // una alumno tiene asociado un usuario
      as : 'usuario_id',  // nombre de mi relacion
      foreignKey: 'id'     // campo con el que voy a igualar
    })
  };
  return alumno;
};