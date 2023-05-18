'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      //en que tabla
      'materia',
      //nombre de la columna
      'carrera_id',{
        type: Sequelize.INTEGER,
        // a que otra tabla hace referencia
        references:{
          model:'carreras',
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
      'materia',
      //nombre de la columna 
      'carrera_id',
     )
    }
  };
  