import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) => {
    return sequelize.define('user', {
        nom: DataTypes.STRING,
        email: DataTypes.STRING,
        mdp: DataTypes.STRING,
    });
  }