const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BannerPayment = sequelize.define('BannerPayment', {
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
    days: {
        type: DataTypes.INTEGER
    },
    amount: {
        type: DataTypes.INTEGER
    },
    payment_status: {
        type: DataTypes.STRING
    },
    transaction_id: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('Active', 'Expired', 'Cancelled'),
        allowNull: false,
        defaultValue: 'Active'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = BannerPayment;
