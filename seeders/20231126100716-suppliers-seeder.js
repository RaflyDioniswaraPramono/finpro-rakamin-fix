'use strict';

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const supplierDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/supplier-seeds.json"));

    payload.map(data => {
      const { supplierName, supplierAddress } = data;

      supplierDatas.push({        
        supplier_name: supplierName,
        supplier_address: supplierAddress
      })
    })

    await queryInterface.bulkInsert("Suppliers", supplierDatas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Suppliers", null, {});
  }
};
