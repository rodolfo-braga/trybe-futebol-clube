'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clubName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'club_name',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('clubs');
  }
};
