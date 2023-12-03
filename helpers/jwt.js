const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (admins) => {
  const { id, Role, admin_name, profil_photo, email, username, description } = admins;

  return jwt.sign(
    {
      id: id,
      role_name: Role.role_name,
      admin_name: admin_name,
      profil_photo: profil_photo,
      email: email,
      username: username,
      description: description,      
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const verifyToken = (access_token) => {
  return jwt.verify(access_token, process.env.SECRET_KEY);
}

module.exports = {
  generateToken,
  verifyToken
}
