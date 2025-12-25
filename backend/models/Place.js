const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
});

const placeSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Restaurant', 'Hotel', 'Club', 'Park', 'Cafe', 'Other']
  },
  description: {
    type: String,
    required: true
  },
  branches: [branchSchema],
  overallRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Place', placeSchema);