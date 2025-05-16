const express = require('express');
const router = express.Router();
const trendingPointsController = require('../controllers/trendingPointsController');

router.post('/create-trending-points', trendingPointsController.createTrendingPoint);
router.get('/fetch-byId-trending-points', trendingPointsController.getAllTrendingPoints);
router.get('/fetch-all-trending-points/:id', trendingPointsController.getTrendingPointById);
router.put('/update-trending-points/:id', trendingPointsController.updateTrendingPoint);
router.delete('/delete-trending-points/:id', trendingPointsController.deleteTrendingPoint);

module.exports = router;
