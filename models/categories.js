"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {    
    static associate(models) {
      Categories.hasMany(models.Products, { foreignKey: "category_id" });
    }
  }
  Categories.init(
    {      
      category_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categories",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return Categories;
};
