"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    static associate(models) {
      Admins.belongsTo(models.Roles, {foreignKey: "role_id"})
    }
  }
  Admins.init(
    {
      role_id: DataTypes.INTEGER,
      admin_name: DataTypes.STRING,
      profil_photo: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.TEXT,      
    },
    {
      sequelize,
      modelName: "Admins",      
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,      
    }
  );
  return Admins;
};
