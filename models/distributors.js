"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Distributors extends Model {    
    static associate(models) {
      // define association here
    }
  }
  Distributors.init(
    {      
      distributor_name: DataTypes.STRING,
      distributor_address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Distributors",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return Distributors;
};
