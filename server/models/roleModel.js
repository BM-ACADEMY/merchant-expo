// models/Role.js
const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['USER', 'MERCHANT', 'SERVICE-PROVIDER', 'GROCERY-SELLER', 'STUDENT', 'ADMIN', 'SUB-ADMIN'],
        required: true
    }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;
