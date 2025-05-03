const express = require('express');
const router = express.Router();
const redeemPointsController = require('../controllers/redeemPointsController');

router.post('/create-redeempoints', redeemPointsController.createRedeemPoint);
router.get('/fetch-all-redeempoints', redeemPointsController.getAllRedeemPoints);
router.get('/fetch-redeempoints-by-id/:id', redeemPointsController.getRedeemPointById);
router.put('/update-redeempoints-by-id/:id', redeemPointsController.updateRedeemPoint);
router.delete('/delete-redeempoints-by-id/:id', redeemPointsController.deleteRedeemPoint);

module.exports = router;
