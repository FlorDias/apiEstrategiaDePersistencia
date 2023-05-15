'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    matricula: DataTypes.INTEGER
  }, {});
  profesor.associate = function(models) {
    this.belongsTo(models.materia,{  // un profesor dicta una materia
      as : 'materia-Relacionada',  // nombre de mi relacion
      foreignKey: 'id'     // campo con el que voy a igualar
    })
  };
  return profesor;
};