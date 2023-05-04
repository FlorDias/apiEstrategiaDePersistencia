'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class materia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  materia.init({
    nombre: DataTypes.STRING,
    duracion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'materia',
  });
  return materia;
};