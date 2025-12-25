import React, { useState } from 'react';

function ReviewForm({ placeId, branchId, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    ratings: {
      overall: 5,
      customerService: 5,
      environment: 5,
      quality: 5
    },
    comment: ''
  });

  const handleRatingChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [category]: parseInt(value)
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      placeId,
      branchId
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
        <input
          type="text"
          required
          value={formData.userName}
          onChange={(e) => setFormData({...formData, userName: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
        <input
          type="email"
          required
          value={formData.userEmail}
          onChange={(e) => setFormData({...formData, userEmail: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Overall Rating: {formData.ratings.overall} ⭐
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={formData.ratings.overall}
            onChange={(e) => handleRatingChange('overall', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer Service: {formData.ratings.customerService} ⭐
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={formData.ratings.customerService}
            onChange={(e) => handleRatingChange('customerService', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Environment: {formData.ratings.environment} ⭐
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={formData.ratings.environment}
            onChange={(e) => handleRatingChange('environment', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quality: {formData.ratings.quality} ⭐
          </label>
          <input
            type="range"
            min="0"
            max="5"
            value={formData.ratings.quality}
            onChange={(e) => handleRatingChange('quality', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
        <textarea
          required
          value={formData.comment}
          onChange={(e) => setFormData({...formData, comment: e.target.value})}
          rows="4"
          maxLength="1000"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your experience..."
        />
        <p className="text-xs text-gray-500 mt-1">{formData.comment.length}/1000 characters</p>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Submit Review
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;