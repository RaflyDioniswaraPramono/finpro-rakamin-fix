'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ApproveStages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_id: {
        type: Sequelize.INTEGER
      },
      admin_name: {
        type: Sequelize.STRING
      },
      profil_photo: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      is_approved: {
        type: Sequelize.STRING,
        defaultValue: "false"
      },      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ApproveStages');
  }
};