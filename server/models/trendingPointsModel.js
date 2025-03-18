const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TrendingPoints = sequelize.define('TrendingPoints', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    product_id: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    trending_Points: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = TrendingPoints;
