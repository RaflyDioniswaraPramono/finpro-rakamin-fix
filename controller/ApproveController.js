const { ApproveStages, Admins, Roles } = require("../models");

class ApproveStagesController {
  static async getApproveStages(req, res) {
    try {
      const datas = await ApproveStages.findAll({
        include: [{ model: Roles, attributes: ["role_name"] }],
      });

      if (datas.length > 0) {
        return res.status(200).json({
          datas: datas,
          message: "Get all approve stage admin successfully!",
        });
      } else {
        res.status(404).json({
          message: `No ordinary admin do the gistration!`,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  static async acceptRequest(req, res) {
    try {
      const id = req.params.id;

      const findAdmin = await ApproveStages.findOne({
        include: [{ model: Roles, attributes: ["role_name"] }],
        where: {
          id: id,
        },
      });

      if (findAdmin) {
        await Admins.create({
          role_id: findAdmin.role_id,
          admin_name: findAdmin.admin_name,
          profil_photo: findAdmin.profil_photo,
          email: findAdmin.email,
          username: findAdmin.username,
          password: findAdmin.password,
          description: findAdmin.description,
        });

        await ApproveStages.destroy({
          where: {
            id: id
          }
        })

        res.status(200).json({
          message: `Admins with id ${id} accepted!`
        })
      } else {
        res.status(404).json({
          message: `Admins with id ${id} not found!`
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  static async declineRequest(req, res) {
    try {
      const id = req.params.id;

      const found = await ApproveStages.findOne({
        where: {
          id: id
        }
      })

      if (found) {
        await ApproveStages.destroy({
          where: {
            id: id
          }
        })

        return res.status(200).json({
          message: `Delete registrations with id ${id} successfully!`
        })
      } else {
        res.status(404).json({
          message: `Registrations with id ${id} not found!`
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ApproveStagesController;
