const { Roles } = require("../models");

class RolesController {
  static async getRoles(req, res) {
    try {
      const datas = await Roles.findAll();

      res.json({
        message: "Get all role successfully!",
        datas: datas,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getRoleById(req, res) {
    try {
      const id = req.params.id;

      const datas = await Roles.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get role with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Role with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateRole(req, res) {
    try {
      const { id, roleName } = req.body;

      const cekRole = await Roles.findOne({
        where: {
          id: id,
        },
      });

      if (cekRole) {
        await Roles.update({
          role_name: roleName,
        });

        res.json({
          message: `Update role with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Role with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRole(req, res) {
    try {
      const id = req.params.id;

      const cekRole = await Roles.findOne({
        where: {
          id: id,
        },
      });

      if (cekRole) {
        await Roles.destroy({
          where: {
            id: id,
          },
        });

        res.json({
          message: `Delete role with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Role with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RolesController;
