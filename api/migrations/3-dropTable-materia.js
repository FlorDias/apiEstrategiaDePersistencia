'use strict';
module.exports = {
 up: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('materia')
  },
 
  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
  }
};