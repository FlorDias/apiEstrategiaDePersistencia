'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      //en que tabla
      'alumnoMateria',
      //nombre de la columna
      'alumno_id',{
        type: Sequelize.INTEGER,
        // a que otra tabla hace referencia
        references:{
          model:'alumnos',
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
      'alumnoMateria',
      //nombre de la columna 
      'alumno_id',
     )
    }
  };
  