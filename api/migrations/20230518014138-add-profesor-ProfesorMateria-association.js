'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      //en que tabla
      'profesorMateria',
      //nombre de la columna
      'profesor_id',{
        type: Sequelize.INTEGER,
        // a que otra tabla hace referencia
        references:{
          model:'profesors',
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
      'profesor_id',
     )
    }
  };
  