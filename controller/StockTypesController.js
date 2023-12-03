const { StockTypes } = require("../models");

class StockTypesController {
  static async addStockType(req, res) {
    try {
      const { stockType } = req.body;

      const cekStockType = await StockTypes.findOne({
        where: {
          stock_type: stockType,
        },
      });

      if (cekStockType) {
        res.json({
          message: `Stock type with stock type name ${stockType} already inserted!`,
        });
      } else {
        await StockTypes.create({
          stock_type: stockType,
        });

        res.json({
          message: "Add stock type successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getStockTypes(req, res) {
    try {
      const datas = await StockTypes.findAll({
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all stock types successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Stock type data list is empty!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getStockTypeById(req, res) {
    try {
      const id = req.params.id;

      const datas = await StockTypes.findOne({
        where: {
          id: id,
        },
      });

      if (datas) {
        res.json({
          message: `Get stock type with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Stock type with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStockType(req, res) {
    try {
      const { id, stockType } = req.body;

      const cekStockType = await StockTypes.findOne({
        where: {
          id: id,
        },
      });

      if (cekStockType) {
        await StockTypes.update(
          {
            stock_type: stockType,
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.json({
          message: `Update stock type with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Stock type with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteStockType(req, res) {
    try {
      const id = req.params.id;

      const cekStockType = await StockTypes.findOne({
        where: {
          id: id,
        },
      });

      if (cekStockType) {
        await StockTypes.destroy({
          where: {
            id: id,
          },
        });

        res.json({
          message: `Delete stock type with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Stock type with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = StockTypesController;
