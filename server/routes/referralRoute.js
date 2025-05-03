const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');

router.post('/create-referrals', referralController.createReferral);
router.get('/fetch-all-referrals', referralController.getAllReferrals);
router.get('/fetch-referrals-by-id/:id', referralController.getReferralById);
router.put('/update-referrals-by-id/:id', referralController.updateReferral);
router.delete('/delete-referrals-by-id/:id', referralController.deleteReferral);

module.exports = router;
