const express = require('express');
const router = express.Router();
const serviceProviderController = require('../controllers/serviceProviderController');

router.post('/create-service-providers', serviceProviderController.createServiceProvider);
router.get('/fetch-all-service-providers', serviceProviderController.getAllServiceProviders);
router.get('/fetch-all-service-provider-products', serviceProviderController.getServiceProviderByEmail);
router.get('/fetch-by-id-service-providers/:id', serviceProviderController.getServiceProviderById);
router.put('/update-service-providers/:id', serviceProviderController.updateServiceProvider);
router.delete('/delete-service-providers/:id', serviceProviderController.deleteServiceProvider);

module.exports = router;
