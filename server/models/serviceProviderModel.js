const mongoose = require('mongoose');

const VehicleTypeSchema = new mongoose.Schema({
    vehicle_type: {
        type: String,
        enum: ['2-wheeler', '3-wheeler', '4-wheeler', '8-wheeler', '12-wheeler'],
        required: true,
    },
}, { _id: false });

const CompanyImageSchema = new mongoose.Schema({
    logo: { type: String },
    vehicle_images: { type: String },
}, { _id: false });

const ServiceProviderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    address_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    email: { type: String, unique: true, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    travels_name: { type: String, required: true },
    license_number: { type: String, unique: true, required: true },
    verified_status: { type: Boolean, default: false },
    trust_shield: { type: Boolean, default: false },
    number_of_travels: { type: Number, required: true },
    vehicle_types: [VehicleTypeSchema],
    vehicle_images: CompanyImageSchema,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const ServiceProvider = mongoose.model('ServiceProvider', ServiceProviderSchema);

module.exports = ServiceProvider;