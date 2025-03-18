const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SubscriptionPlanElementMapping = sequelize.define('SubscriptionPlanElementMapping', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    subscription_plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    element_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(255),
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

module.exports = SubscriptionPlanElementMapping;
