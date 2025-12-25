const Review = require('../models/Review');
const Place = require('../models/Place');

// Create new review
exports.createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    const newReview = await review.save();
    
    // Update place and branch ratings
    await updateRatings(req.body.placeId, req.body.branchId);
    
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a place
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId })
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update ratings helper function
async function updateRatings(placeId, branchId) {
  try {
    // Get all reviews for this branch
    const branchReviews = await Review.find({ placeId, branchId });
    
    if (branchReviews.length > 0) {
      const avgRating = branchReviews.reduce((sum, review) => 
        sum + review.ratings.overall, 0) / branchReviews.length;
      
      // Update branch rating
      await Place.updateOne(
        { _id: placeId, 'branches._id': branchId },
        { 
          $set: { 
            'branches.$.averageRating': avgRating,
            'branches.$.totalReviews': branchReviews.length
          }
        }
      );
    }
    
    // Update overall place rating
    const allReviews = await Review.find({ placeId });
    if (allReviews.length > 0) {
      const overallAvg = allReviews.reduce((sum, review) => 
        sum + review.ratings.overall, 0) / allReviews.length;
      
      await Place.updateOne(
        { _id: placeId },
        { 
          $set: { 
            overallRating: overallAvg,
            totalReviews: allReviews.length
          }
        }
      );
    }
  } catch (error) {
    console.error('Error updating ratings:', error);
  }
}

module.exports = exports;