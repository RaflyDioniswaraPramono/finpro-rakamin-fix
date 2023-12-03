const { Distributors, DistributorReports } = require("../models");

class DistributorsController {
  static async addDistributor(req, res) {
    try {
      const { distributorName, distributorAddress } = req.body;

      const cekDistributor = await Distributors.findOne({
        where: {
          distributor_name: distributorName,
          distributor_address: distributorAddress
        },
      });

      if (!cekDistributor) {
        await Distributors.create({
          distributor_name: distributorName,
          distributor_address: distributorAddress,
        });

        return res.status(200).json({
          message: "Add distributor successfully!",
        });
      } else {
        res.status(409).json({
          message: "Distributor already inserted!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getDistributors(req, res) {
    try {
      const datas = await Distributors.findAll({
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all distributor successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Distributor data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getDistributorById(req, res) {
    try {
      const id = req.params.id;

      const datas = await Distributors.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get distributor with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Distributor with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateDistributor(req, res) {
    try {
      const { id, distributorName, distributorAddress } = req.body;

      const cekDistributor = await Distributors.findOne({
        where: {
          id: id,
        },
      });

      if (cekDistributor) {
        await Distributors.update(
          {
            distributor_name: distributorName,
            distributor_address: distributorAddress,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.json({
          message: `Update distributor with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Distributor with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDistributor(req, res) {
    try {
      const id = req.params.id;

      const cekDistributor = await Distributors.findOne({
        where: {
          id: id,
        },
      });

      if (cekDistributor) {
        const cekReports = await DistributorReports.findOne({
          where: {
            distributor_id: id,
          },
        });

        if (!cekReports) {
          await Distributors.destroy({
            where: {
              id: id,
            },
          });

          return res.status(200).json({
            message: `Delete distributor with id ${id} successfully!`,
          });
        } else {
          res.status(409).json({
            message: `Cannot delete distributor with id ${id}, because this distributor on the report list!`
          });
        }        
      } else {
        res.json({
          message: `Distributor with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DistributorsController