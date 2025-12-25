import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlaceCard({ place }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  return (
    <div 
      onClick={() => navigate(`/place/${place._id}`)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">{place.businessName}</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {place.category}
        </span>
      </div>
      
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{place.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{renderStars(place.overallRating)}</span>
          <span className="text-gray-700 font-semibold">{place.overallRating.toFixed(1)}</span>
        </div>
        <span className="text-gray-500 text-sm">{place.totalReviews} reviews</span>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        {place.branches.length} branch{place.branches.length !== 1 ? 'es' : ''} available
      </div>
    </div>
  );
}

export default PlaceCard;