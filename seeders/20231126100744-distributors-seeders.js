'use strict';

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const distributorDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/distributor-seeds.json"));

    payload.map(data => {
      const { distributorName, distributorAddress } = data;

      distributorDatas.push({        
        distributor_name: distributorName,
        distributor_address: distributorAddress
      })
    })

    await queryInterface.bulkInsert("Distributors", distributorDatas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Distributors", null, {});
  }
};
