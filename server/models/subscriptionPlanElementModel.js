const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriptionPlanElement = sequelize.define('SubscriptionPlanElement', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    element_name: {
        type: DataTypes.STRING(255),
        allowNull: false
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

module.exports = SubscriptionPlanElement;
