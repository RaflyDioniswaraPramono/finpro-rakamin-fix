"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suppliers extends Model {    
    static associate(models) {
      // define association here
    }
  }
  Suppliers.init(
    {      
      supplier_name: DataTypes.STRING,
      supplier_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Suppliers",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return Suppliers;
};
