const {
  Products,
  Categories,
  StockTypes,
  sequelize,
  SupplierReports,
  DistributorReports
} = require("../models");

class ProductsController {
  static async addProduct(req, res) {
    try {
      const {
        categoryId,
        stockTypeId,
        productName,
        productPrice,
        productStock,
      } = req.body;

      const cekProduct = await Products.findOne({
        where: {
          product_name: productName,
        },
      });

      if (cekProduct) {
        res.json({
          message: `Product with product name ${productName} already inserted!`,
        });
      } else {
        await Products.create({
          category_id: categoryId,
          stock_type_id: stockTypeId,
          product_name: productName,
          product_price: productPrice,
          product_stock: productStock,
        });

        res.json({
          message: "Add product successfully!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getTotalStock(req, res) {
    try {
      const onStock = await Products.findOne({
        attributes: [
          [
            sequelize.fn("sum", sequelize.col("Products.product_stock")),
            "total_on_stock",
          ],
        ],
        raw: true,
      });

      res.json({
        total_on_stock: onStock,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  
  static async getProducts(req, res) {
    try {
      const datas = await Products.findAll({
        include: [
          { model: Categories, attributes: ["category_name"] },
          { model: StockTypes, attributes: ["stock_type"] },
        ],
        order: [["id", "DESC"]],
      });

      if (datas.length > 0) {
        res.json({
          message: "Get all product successfully!",
          datas: datas,
        });
      } else {
        res.json({
          message: "Product data list is empty!",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  static async getProductById(req, res) {
    try {
      const id = await req.params.id;

      const datas = await Products.findOne({
        where: {
          id: id,
        },
        include: [{ model: Categories }, { model: StockTypes }],
        attributes: ["id", "product_name", "product_price", "product_stock"],
      });

      if (datas) {
        res.json({
          message: `Get product with id ${id} successfully!`,
          datas: datas,
        });
      } else {
        res.json({
          message: `Product with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProduct(req, res) {
    try {
      const {
        id,
        categoryId,
        stockTypeId,
        productName,
        productPrice,
        productStock,
      } = req.body;

      const cekProduct = await Products.findOne({
        where: {
          id: id,
        },
      });

      if (cekProduct) {
        await Products.update(
          {
            category_id: categoryId,
            stock_type_id: stockTypeId,
            product_name: productName,
            product_price: productPrice,            
          },
          {
            where: {
              id: id,
            },
          }
        );

        res.json({
          message: `Update product with id ${id} successfully!`,
        });
      } else {
        res.json({
          message: `Product with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = req.params.id;

      const cekProduct = await Products.findOne({
        where: {
          id: id,
        },
      });

      if (cekProduct) {
        await Products.destroy({
          where: {
            id: id,
          },
        });

        await SupplierReports.destroy({
          where: {
            product_id: id,
          },
        });

        await DistributorReports.destroy({
          where: {
            product_id: id,
          },
        });

        res.json({
          message: `Delete product ${cekProduct.product_name} successfully!`,
        });
      } else {
        res.json({
          message: `Product with id ${id} not found!`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductsController;
