"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ApproveStages extends Model {
    static associate(models) {
      ApproveStages.belongsTo(models.Roles, {foreignKey: "role_id"})
    }
  }
  ApproveStages.init(
    {
      role_id: DataTypes.INTEGER,
      admin_name: DataTypes.STRING,
      profil_photo: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.STRING,
      is_approved: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ApproveStages",
      createdAt: false,
      updatedAt: false,
      freezeTableName: true,
    }
  );
  return ApproveStages;
};
