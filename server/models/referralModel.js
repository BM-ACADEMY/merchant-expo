const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Referral = sequelize.define('Referral', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    referred_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    referral_code_used: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    points_awarded: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false
});

module.exports = Referral;
