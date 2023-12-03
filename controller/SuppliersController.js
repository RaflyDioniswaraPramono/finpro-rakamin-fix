const { Suppliers, Products, SupplierReports } = require("../models");

class SuppliersController {
  static async addSupplier(req, res) {
    try {
      const { supplierName, supplierAddress } = req.body;

      const cekSupplier = await Suppliers.findOne({
        where: {
          supplier_name: supplierName,
          supplier_address: supplierAddress,
        },
      });

      if (!cekSupplier) {
        await Suppliers.create({
          supplier_name: supplierName,
          supplier_address: supplierAddress,
        });

        return res.status(200).json({
          message: "Add supplier successfully!",
        });
      } else {
        res.status(409).json({
          message: "Supplier already inserted!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSuppliers(req, res) {
    try {
      const datas = await Suppliers.findAll({
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all supplier successfully!",
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

  static async getSupplierById(req, res) {
    try {
      const id = req.params.id;

      const datas = await Suppliers.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get supplier with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Supplier with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateSupplier(req, res) {
    try {
      const { id, supplierName, supplierAddress } = req.body;

      const cekSupplier = await Suppliers.findOne({
        where: {
          id: id,
        },
      });

      if (cekSupplier) {
        await Suppliers.update(
          {
            supplier_name: supplierName,
            supplier_address: supplierAddress,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.json({
          message: `Update supplier with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Supplier with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSupplier(req, res) {
    try {
      const id = req.params.id;

      const cekSupplier = await Suppliers.findOne({
        where: {
          id: id,
        },
      });

      if (cekSupplier) {
        const cekReports = await SupplierReports.findOne({
          where: {
            supplier_id: id,
          },
        });

        if (!cekReports) {
          await Suppliers.destroy({
            where: {
              id: id,
            },
          });

          return res.status(200).json({
            message: `Delete supplier with id ${id} successfully!`,
          });
        } else {
          res.status(409).json({
            message: `Cannot delete supplier with id ${id}, because this supplier on the report list!`,
          });
        }
      } else {
        res.json({
          message: `Supplier with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SuppliersController;
