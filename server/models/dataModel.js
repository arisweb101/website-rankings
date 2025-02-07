const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Data = sequelize.define(
    'Data',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        tableName: 'data',
    }
);

module.exports = Data;
