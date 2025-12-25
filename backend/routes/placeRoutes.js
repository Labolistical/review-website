const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// Get all places (with optional filters)
router.get('/', placeController.getAllPlaces);

// Get single place
router.get('/:id', placeController.getPlace);

// Create new place
router.post('/', placeController.createPlace);

// Get reviews for specific branch
router.get('/:placeId/branches/:branchId/reviews', placeController.getBranchReviews);

module.exports = router;