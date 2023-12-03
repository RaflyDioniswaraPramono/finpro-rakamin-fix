const { DistributorReports, Products, Distributors } = require("../models");

class DistributorReportsController {
  static async addDistributorReport(req, res) {
    try {
      const {
        productId,
        distributorId,
        amountDistributorProduct,
        sendingDate,
      } = req.body;

      const findStock = await Products.findOne({
        where: {
          id: productId,
        },
      });

      if (amountDistributorProduct > findStock.product_stock) {
        return res.status(409).json({
          message: `Stock not enough!, this product stock only ${findStock.product_stock}. Please insert bought amount less than ${findStock.product_stock}!`,
        });
      } else {
        await DistributorReports.create({
          product_id: productId,
          distributor_id: distributorId,
          amount_distributor_product: amountDistributorProduct,
          sending_date: sendingDate,
        });

        await Products.update(
          {
            product_stock:
              parseInt(findStock.product_stock) -
              parseInt(amountDistributorProduct),
          },
          {
            where: {
              id: productId,
            },
          }
        );

        res.status(201).json({
          message: "Add distributor report successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getDistributorReports(req, res) {
    try {
      const datas = await DistributorReports.findAll({
        include: [{ model: Distributors }, { model: Products }],
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all distributor report successfully!",
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

  static async getDistributorReportById(req, res) {
    try {
      const id = req.params.id;

      const datas = await DistributorReports.findOne({
        wehre: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get distributor report with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Distributor report with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteDistributorReport(req, res) {
    try {
      const id = req.params.id;

      const cekDistributorReport = await DistributorReports.findOne({
        where: {
          id: id,
        },
      });

      if (cekDistributorReport) {
        await Products.update({
          product_stock: cekDistributorReport.amountDistributorProduct
        }, {
          where: {
            id: cekDistributorReport.product_id
          }
        })

        await DistributorReports.destroy({
          where: {
            id: id,
          },
        });

        res.json({
          message: `Delete distirbutor report with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Distirbutor report with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DistributorReportsController;
