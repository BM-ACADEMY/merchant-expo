const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    seller_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

        refPath: 'sellerModel',

        ref: 'Merchant' // Dynamic reference to different seller models

    },
    sellerModel: {
        type: String,
        required: true,

        enum: [ 'Merchant', 'ServiceProvider'] ,

        enum: [ 'Merchant', 'ServiceProvider'] // Possible seller models

    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        default: null
    },
    super_sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SuperSubCategory',
        default: null
    },
    deep_sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeepSubCategory',
        default: null
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true,
        min: 0
    },
    stock_quantity: {
        type: Number,
        required: true,
        min: 0
    },

    product_image: {
        type: String,
        default: '' },

    image: {
        type: String,
        default: '' // URL or file path

    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
