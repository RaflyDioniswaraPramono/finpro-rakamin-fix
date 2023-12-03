'use strict';

require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const datas = [{
      role_id: 1,
      admin_name: "FSWD 6B | Rakamin Academy",
      profil_photo: "../../../assets/profile/super-admins.jpg",
      email: "rakaminfswd6b@gamil.com",
      username: "fswd6b",
      password: process.env.PWD,
      description: "We are from FSWD 6B Rakamin Academy!"
    }]

    await queryInterface.bulkInsert("Admins", datas, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  }
};
