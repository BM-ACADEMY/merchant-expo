const express = require('express');
const router = express.Router();
const subscriptionPlanElementMappingController = require('../controllers/subscriptionPlanElementMappingController');

router.post('/create-subscriptionplanelementmappings', subscriptionPlanElementMappingController.createMapping);
router.get('/fetch-all-subscriptionplanelementmappings', subscriptionPlanElementMappingController.getAllMappings);
router.get('/fetch-subscriptionplanelementmappings-by-id/:id', subscriptionPlanElementMappingController.getMappingById);
router.put('/update-subscriptionplanelementmappings-by-id/:id', subscriptionPlanElementMappingController.updateMapping);
router.delete('/delete-subscriptionplanelementmappings-by-id/:id', subscriptionPlanElementMappingController.deleteMapping);

module.exports = router;
