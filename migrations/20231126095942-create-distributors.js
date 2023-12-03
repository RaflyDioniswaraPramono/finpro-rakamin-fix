'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Distributors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },      
      distributor_name: {
        type: Sequelize.STRING
      },
      distributor_address: {
        type: Sequelize.STRING
      },      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Distributors');
  }
};