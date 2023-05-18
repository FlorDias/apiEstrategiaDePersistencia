'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn(
    //en que tabla
    'alumnos',
    //nombre de la columna
    'usuario_id',{
      type: Sequelize.INTEGER,
      // a que otra tabla hace referencia
      references:{
        model:'usuarios',
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
    'alumnos',
    //nombre de la columna 
    'usuarios_id',
   )
  }
};
