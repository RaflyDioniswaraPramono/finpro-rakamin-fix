"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
      },
      stock_type_id: {
        type: Sequelize.INTEGER,
      },
      product_name: {
        type: Sequelize.STRING,
      },
      product_price: {
        type: Sequelize.STRING,
      },
      product_stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
