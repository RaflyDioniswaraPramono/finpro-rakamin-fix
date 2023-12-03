"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {    
    static associate(models) {
      Roles.hasMany(models.Admins, { foreignKey: "role_id" });
      Roles.hasMany(models.ApproveStages, { foreignKey: "role_id" });
    }
  }
  Roles.init(
    {
      role_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roles",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return Roles;
};
