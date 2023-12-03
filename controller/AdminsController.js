const { ApproveStages, Admins, Roles } = require("../models");
const { encryptedPassword, decryptedPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
require("dotenv").config();

class AdminsController {
  static async register(req, res) {
    try {
      const {
        roleId,
        adminName,
        email,
        username,
        password,
        description,
        isApprove,
      } = req.body;

      const profilPhoto = req.file.path;

      const cekUsername = await Admins.findOne({
        where: {
          username: username,
        },
      });

      if (cekUsername) {
        return res.json({
          message: `Username ${username} already registered, please use another username!`,
        });
      }

      const cekEmail = await Admins.findOne({
        where: {
          email: email,
        },
      });

      if (cekEmail) {
        return res.json({
          message: `Email ${email} already registered, please use another email!`,
        });
      }
      const hashedPassword = encryptedPassword(password);

      await ApproveStages.create({
        role_id: roleId,
        admin_name: adminName,
        profil_photo: profilPhoto,
        email: email,
        username: username,
        password: hashedPassword,
        description: description,
        is_approve: isApprove,
      });

      res.json({
        message: "Register successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const admins = await Admins.findOne({
        include: [{ model: Roles, attributes: ["role_name"] }],
        where: {
          username: username,
        },
      });

      if (!admins) {
        return res.status(404).json({
          message: `Admin with username ${username} is not registered!`,
        });
      }

      if (admins.is_approve === "false") {
        return res.status(409).json({
          message: `Admin with username ${username} still not approved!`,
        });
      }

      if (admins.role_id === 1) {
        const accessToken = generateToken(admins);

        return res.status(200).json({
          id: admins.id,
          message: "Login successfully!",
          accessToken: accessToken,
        });
      }

      if (decryptedPassword(password, admins.password)) {
        const accessToken = generateToken(admins);

        return res.status(200).json({
          id: admins.id,
          message: "Login successfully!",
          accessToken: accessToken,
        });
      } else {
        res.status(409).json({
          message: "Password is incorrect!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAdmins(req, res) {
    try {
      const datas = await Admins.findAll({
        include: [{ model: Roles, attributes: ["role_name"] }],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all admin data successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Admin data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getAdminById(req, res) {
    try {
      const id = req.params.id;

      const datas = await Admins.findOne({
        where: {
          id: id,
        },
        include: [{ model: Roles, attributes: ["role_name"] }],
      });

      if (datas) {
        res.status(200).json({
          message: `Get admin data by id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.status(404).json({
          message: `Admin with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateAdmin(req, res) {
    try {
      const {
        id,
        adminName,
        profilPhoto,
        email,
        username,
        password,
        description,
      } = req.body;

      const datas = await Admins.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        await Admins.update({
          admin_name: adminName,
          profil_photo: profilPhoto,
          email: email,
          username: username,
          password: password,
          description: description,
        });

        res.json({
          message: `Update admin with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Admin with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const id = req.params.id;

      const datas = await Admins.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        if (datas.role_id === 1) {
          return res.status(409).json({
            message: "Cannot delete super admin account!",
          });
        } else {
          await Admins.destroy({
            where: {
              id: id,
            },
          });

          res.json({
            message: `Delete admin with id ${id} successfully!`,
          });
        }
      } else {
        res.json({
          message: `Admin with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = AdminsController;
