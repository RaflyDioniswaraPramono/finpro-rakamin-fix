'use strict';

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const roleDatas = [];
    const payload = JSON.parse(fs.readFileSync("./seeds/role-seeds.json"));

    payload.map(data => {
      const { roleName } = data;

      roleDatas.push({
        role_name: roleName
      })
    })

    await queryInterface.bulkInsert("Roles", roleDatas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  }
};
