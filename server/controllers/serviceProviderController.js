const ServiceProvider =require('../models/serviceProviderModel');


exports.createServiceProvider = async (req, res) => {
    try {
        const serviceProvider = new ServiceProvider({
            ...req.body,
            vehicle_images: req.body.imageUrls,
        });

        await serviceProvider.save();
        res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Service Provider created successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            message: error.message,
        });
    }
};

exports.getAllServiceProviders = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page) || 1, 1);
        const limit = Math.max(parseInt(req.query.limit) || 10, 1);
        const skip = (page - 1) * limit;

        const totalRecords = await ServiceProvider.countDocuments();
        const totalPages = Math.ceil(totalRecords / limit);

        const serviceProviders = await ServiceProvider.find()
            .populate('user_id')
            .populate('address_id')
            .skip(skip)
            .limit(limit);

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Providers fetched successfully',
            data: serviceProviders,
            pagination: {
                currentPage: page,
                totalPages,
                totalRecords,
                perPage: limit
            }
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null
        });
    }
};

exports.getServiceProviderById = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id).populate('user_id').populate('address_id');
        if (!serviceProvider) return res.status(404).json({
            statusCode: 404,
            success: false,
            message: 'Service Provider not found',
            data: null
        });
        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider fetched successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
            data: null
        });
    }
};

exports.updateServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findById(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Service Provider not found',
            });
        }

        Object.assign(serviceProvider, req.body);
        await serviceProvider.save();

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider updated successfully',
            data: serviceProvider
        });
    } catch (error) {
        res.status(400).json({
            statusCode: 400,
            success: false,
            message: error.message,
        });
    }
};

exports.deleteServiceProvider = async (req, res) => {
    try {
        const serviceProvider = await ServiceProvider.findByIdAndDelete(req.params.id);
        if (!serviceProvider) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: 'Service Provider not found',
            });
        }

        res.json({
            statusCode: 200,
            success: true,
            message: 'Service Provider deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            success: false,
            message: error.message,
        });
    }
};
