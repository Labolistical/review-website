const Place = require('../models/Place');
const Review = require('../models/Review');

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.businessName = { $regex: search, $options: 'i' };
    }
    
    const places = await Place.find(query).sort({ overallRating: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single place
exports.getPlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new place
exports.createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    const newPlace = await place.save();
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get branch reviews
exports.getBranchReviews = async (req, res) => {
  try {
    const { placeId, branchId } = req.params;
    const reviews = await Review.find({ placeId, branchId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};