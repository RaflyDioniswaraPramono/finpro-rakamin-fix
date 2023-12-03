'use strict';

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const productDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/product-seeds.json"));

    payload.map(data => {
      const { categoryId, stockTypeId, productName, productPrice, productStock } = data;

      productDatas.push({
        category_id: categoryId,
        stock_type_id: stockTypeId,
        product_name: productName,
        product_price: productPrice,
        product_stock: productStock
      })
    })

    await queryInterface.bulkInsert("Products", productDatas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
