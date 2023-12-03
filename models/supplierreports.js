"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SupplierReports extends Model {
    static associate(models) {
      SupplierReports.belongsTo(models.Suppliers, {
        foreignKey: "supplier_id",
      });
      SupplierReports.belongsTo(models.Products, { foreignKey: "product_id" });      
    }
  }
  SupplierReports.init(
    {
      product_id: DataTypes.INTEGER,
      supplier_id: DataTypes.INTEGER,
      amount_supplier_product: DataTypes.INTEGER,
      sending_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "SupplierReports",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return SupplierReports;
};
