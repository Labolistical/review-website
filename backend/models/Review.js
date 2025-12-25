const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  placeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true
  },
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  userName: {
    type: String,
    required: true,
    trim: true
  },
  userEmail: {
    type: String,
    required: true
  },
  ratings: {
    overall: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    customerService: {
      type: Number,
      min: 0,
      max: 5
    },
    environment: {
      type: Number,
      min: 0,
      max: 5
    },
    quality: {
      type: Number,
      min: 0,
      max: 5
    }
  },
  comment: {
    type: String,
    required: true,
    maxlength: 1000
  },
  images: [{
    type: String
  }],
  helpful: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Review', reviewSchema);