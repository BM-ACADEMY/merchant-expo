const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RedeemPoints = sequelize.define('RedeemPoints', {
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
    coupon_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    redeem_point: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    coupon_code: {
        type: DataTypes.STRING,
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

module.exports = RedeemPoints;
