"use strict";

require("dotenv").config();
const { encryptedPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPasswordAdmin = encryptedPassword(process.env.PWD);

    const datas = [
      {
        role_id: 1,
        admin_name: "Abid Muhyiyuddin",
        profil_photo: "../../../assets/profile/super-admins.jpg",
        email: "abidmuhyiyuddin592@gmail.com",
        username: "abid",
        password: hashPasswordAdmin,
        description: "We are from FSWD 6B Rakamin Academy!",
      },
    ];

    await queryInterface.bulkInsert("Admins", datas, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
