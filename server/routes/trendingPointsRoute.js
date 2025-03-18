const express = require('express');
const router = express.Router();
const trendingPointsController = require('../controllers/trendingPointsController');

router.post('/trending-points', trendingPointsController.createTrendingPoint);
router.get('/trending-points', trendingPointsController.getAllTrendingPoints);
router.get('/trending-points/:id', trendingPointsController.getTrendingPointById);
router.put('/trending-points/:id', trendingPointsController.updateTrendingPoint);
router.delete('/trending-points/:id', trendingPointsController.deleteTrendingPoint);

module.exports = router;
