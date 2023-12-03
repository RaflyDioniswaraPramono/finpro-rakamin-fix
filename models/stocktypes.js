"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StockTypes extends Model {    
    static associate(models) {
      StockTypes.hasMany(models.Products, { foreignKey: "stock_type_id" });
    }
  }
  StockTypes.init(
    {
      stock_type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StockTypes",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return StockTypes;
};
