const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: true },
<<<<<<< HEAD
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
=======
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
>>>>>>> 6ebfee91356ac536c0f4855f30ffe835026d71ed
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
