const express = require('express');
const router = express.Router();
const subscriptionPlanElementController = require('../controllers/subscriptionPlanElementController');

router.post('/create-subscriptionplanelements', subscriptionPlanElementController.createElement);
router.get('/fetch-all-subscriptionplanelements', subscriptionPlanElementController.getAllElements);
router.get('/fetch-subscriptionplanelements-by-id/:id', subscriptionPlanElementController.getElementById);
router.put('/update-subscriptionplanelements-by-id/:id', subscriptionPlanElementController.updateElement);
router.delete('/delete-subscriptionplanelements-by-id/:id', subscriptionPlanElementController.deleteElement);

module.exports = router;
