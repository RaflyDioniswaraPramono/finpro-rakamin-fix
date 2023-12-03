const bcrypt = require("bcrypt");
require("dotenv").config();

const encryptedPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

const decryptedPassword = (userPassword, password) => {
  return bcrypt.compareSync(userPassword, password);
};

module.exports = {
  encryptedPassword,
  decryptedPassword,
};
