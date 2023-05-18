'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      //en que tabla
      'profesorMateria',
      //nombre de la columna
      'materia_id',{
        type: Sequelize.INTEGER,
        // a que otra tabla hace referencia
        references:{
          model:'materia',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
     )
    },
  
    down: (queryInterface, Sequelize) => {
     return queryInterface.removeColumn(
      // en que tabla
      'profesorMateria',
      //nombre de la columna 
      'materia_id',
     )
    }
  };
  