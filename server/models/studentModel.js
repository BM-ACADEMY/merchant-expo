const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    college_email: { type: String, unique: true, required: true },
    id_card: { type: String, required: true }, // URL or file path
    address_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true,
    },
    college_name: { type: String, required: true },
    university_name: { type: String, required: true },
    verified: { type: Boolean, default: false },
    expiry_date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
