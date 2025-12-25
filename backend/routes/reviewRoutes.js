const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Get all reviews for a place
router.get('/place/:placeId', reviewController.getReviews);

// Create new review
router.post('/', reviewController.createReview);

module.exports = router;