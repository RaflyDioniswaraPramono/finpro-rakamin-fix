"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {    
    static associate(models) {
      Products.belongsTo(models.Categories, { foreignKey: "category_id" });
      Products.belongsTo(models.StockTypes, { foreignKey: "stock_type_id" });      
    }
  }
  Products.init(
    {
      category_id: DataTypes.INTEGER,
      stock_type_id: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      product_price: DataTypes.STRING,
      product_stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Products",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return Products;
};
