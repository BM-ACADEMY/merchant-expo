const express = require('express');
const router = express.Router();
const bannerPaymentController = require('../controllers/bannerPaymentController');

router.post('/create-banner-payments', bannerPaymentController.createBannerPayment);
router.get('/fetch-all-banner-payments', bannerPaymentController.getAllBannerPayments);
router.get('/fetch-banner-payments-by-id/:id', bannerPaymentController.getBannerPaymentById);
router.put('/update-banner-payments-by-id/:id', bannerPaymentController.updateBannerPayment);
router.delete('/delete-banner-payments-by-id/:id', bannerPaymentController.deleteBannerPayment);

module.exports = router;
