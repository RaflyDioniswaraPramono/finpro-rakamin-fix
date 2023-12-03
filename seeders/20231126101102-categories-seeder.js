'use strict';

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categoryDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/category-seeds.json"));

    payload.map(data => {
      const { categoryName } = data;

      categoryDatas.push({        
        category_name: categoryName
      })
    })

    await queryInterface.bulkInsert("Categories", categoryDatas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  }
};
