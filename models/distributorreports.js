"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DistributorReports extends Model {
    static associate(models) {
      DistributorReports.belongsTo(models.Distributors, {
        foreignKey: "distributor_id",
      });
      DistributorReports.belongsTo(models.Products, { foreignKey: "product_id" });
    }
  }
  DistributorReports.init(
    {
      product_id: DataTypes.INTEGER,
      distributor_id: DataTypes.INTEGER,
      amount_distributor_product: DataTypes.INTEGER,
      sending_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "DistributorReports",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return DistributorReports;
};
