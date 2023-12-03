"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const stockTypeDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/stock-type-seeds.json"));

    payload.map((data) => {
      const { stockType } = data;

      stockTypeDatas.push({
        stock_type: stockType,
      });
    });

    await queryInterface.bulkInsert("StockTypes", stockTypeDatas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("StockTypes", null, {});
  },
};
