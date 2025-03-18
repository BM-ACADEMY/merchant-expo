const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    id_card: { type: String, required: true }, // URL or file path
    door_no: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true, maxlength: 6 },
    college_name: { type: String, required: true },
    university_name: { type: String, required: true },
    college_city: { type: String, required: true },
    college_state: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);