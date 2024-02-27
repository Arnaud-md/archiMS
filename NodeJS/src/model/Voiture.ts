import { DataTypes, Sequelize } from "sequelize";

export const VoitureModel = (sequelize: Sequelize) => {
    return sequelize.define('voiture', {
        marque: DataTypes.STRING,
        modele: DataTypes.STRING,
        annee: DataTypes.STRING,
        couleur: DataTypes.STRING,
    });
}