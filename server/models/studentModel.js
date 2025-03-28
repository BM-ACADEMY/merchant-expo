const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
    address_id:{  type: mongoose.Schema.Types.ObjectId,
        ref: "Address"
    },
    id_card_image: { type: String, required: true },
    college_name: { type: String, required: true },
    university_name: { type: String, required: true },
    college_city: { type: String, required: true },
    college_state: { type: String, required: true },
    college_country: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);