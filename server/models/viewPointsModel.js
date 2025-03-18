const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ViewPoints = sequelize.define('ViewPoints', {
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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    view_Points: {
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

module.exports = ViewPoints;
