  
'use strict';
module.exports = {

  // Creating a new table Leads
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Leads', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID, /* Universal Unique Identifier, 128-bit number used to uniquely identify some object */
        defaultValue: Sequelize.UUIDV4, 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      email: {
      	allowNull: false,
      	type: Sequelize.STRING
      },
    })
  },

  // Droping table Leads
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Leads');
  }
};