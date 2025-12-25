import React from 'react';

function ReviewCard({ review }) {
  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800">{review.userName}</h4>
          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl">{renderStars(review.ratings.overall)}</div>
          <span className="text-gray-700 font-semibold">{review.ratings.overall}/5</span>
        </div>
      </div>

      <p className="text-gray-700">{review.comment}</p>

      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">Service</p>
          <p className="font-semibold text-sm">{review.ratings.customerService} ⭐</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Environment</p>
          <p className="font-semibold text-sm">{review.ratings.environment} ⭐</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Quality</p>
          <p className="font-semibold text-sm">{review.ratings.quality} ⭐</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;