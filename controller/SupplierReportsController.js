const { SupplierReports, Products, Suppliers } = require("../models");

class SupplierReportsController {
  static async addSupplierReport(req, res) {
    try {
      const { productId, supplierId, amountSupplierProduct, sendingDate } =
        req.body;

      await SupplierReports.create({
        product_id: productId,
        supplier_id: supplierId,
        amount_supplier_product: amountSupplierProduct,
        sending_date: sendingDate,
      });

      const findProduct = await Products.findOne({
        where: {
          id: productId,
        },
      });

      await Products.update(
        {
          product_stock: findProduct.product_stock + amountSupplierProduct,
        },
        {
          where: {
            id: productId,
          },
        }
      );

      res.json({
        message: "Add supplier report successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getSupplierReports(req, res) {
    try {
      const datas = await SupplierReports.findAll({
        include: [{ model: Suppliers }, { model: Products }],
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all supplier report successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Supplier data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSupplierReportById(req, res) {
    try {
      const id = req.params.id;

      const datas = await SupplierReports.findOne({
        include: [{ model: Suppliers }, { model: Products }],
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get supplier report with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Supplier report with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSupplierReport(req, res) {
    try {
      const id = req.params.id;

      const cekSupplierReport = await SupplierReports.findOne({
        where: {
          id: id,
        },
      });

      const findProduct = await Products.findOne({
        where: {
          id: cekSupplierReport.product_id,
        },
      });

      if (cekSupplierReport) {
        await SupplierReports.destroy({
          where: {
            id: id,
          },
        });

        res.json({
          message: `Delete supplier report with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Supplier report with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SupplierReportsController;
