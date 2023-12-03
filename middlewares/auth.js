const { verifyToken } = require("../helpers/jwt");

const authentication = (req, res, next) => {
  const { access_token } = req.headers;

  if (!access_token) {
    return res.status(404).json({
      message: "Token not found!",
    });
  } else {
    try {
      const decode = verifyToken(access_token);

      req.adminData = decode;
      next();
    } catch (err) {
      res.json({
        message: "Token expired, relogin required!"
      });
    }
  }
};

const authorization = (req, res, next) => {
  let role = req.adminData.role_name;  

  if (role === "ADMIN") {
    next();
  } else {
    res.status(400).json({
      message: "Admin only!",
      role: role
    });
  }
};

module.exports = {
  authentication,
  authorization,
};
