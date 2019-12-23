'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'materia',
      'relacion2_carrera',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'carreras', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */


    return queryInterface.removeColumn(
      'materia', // name of Source model
      'relacion2_carrera' // key we want to remove
    )
  }
};
