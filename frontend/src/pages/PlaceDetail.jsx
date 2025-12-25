import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlace, getBranchReviews, createReview } from '../services/api';
import ReviewCard from '../components/ReviewCard';
import ReviewForm from '../components/ReviewForm';

function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlace();
  }, [id]);

  useEffect(() => {
    if (selectedBranch) {
      fetchBranchReviews();
    }
  }, [selectedBranch]);

  const fetchPlace = async () => {
    try {
      const data = await getPlace(id);
      setPlace(data);
      if (data.branches.length > 0) {
        setSelectedBranch(data.branches[0]);
      }
    } catch (error) {
      console.error('Error fetching place:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranchReviews = async () => {
    if (!selectedBranch) return;
    try {
      const data = await getBranchReviews(id, selectedBranch._id);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (reviewData) => {
    try {
      await createReview(reviewData);
      setShowReviewForm(false);
      fetchBranchReviews();
      fetchPlace();
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.round(rating));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Place not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-blue-100 hover:text-white transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl font-bold">{place.businessName}</h1>
          <p className="text-blue-100 mt-2">{place.category}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700 mb-4">{place.description}</p>
          <div className="flex items-center gap-4">
            <div className="text-3xl">{renderStars(place.overallRating)}</div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{place.overallRating.toFixed(1)}</p>
              <p className="text-gray-500 text-sm">{place.totalReviews} total reviews</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Branch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {place.branches.map(branch => (
              <button
                key={branch._id}
                onClick={() => setSelectedBranch(branch)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedBranch?._id === branch._id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <h3 className="font-semibold text-gray-800 mb-1">{branch.location}</h3>
                <p className="text-sm text-gray-600 mb-2">{branch.address}</p>
                <div className="flex items-center gap-2">
                  <span>{renderStars(branch.averageRating)}</span>
                  <span className="text-sm text-gray-600">
                    {branch.averageRating.toFixed(1)} ({branch.totalReviews} reviews)
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedBranch && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Reviews for {selectedBranch.location}
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showReviewForm ? 'Cancel' : 'Write a Review'}
              </button>
            </div>

            {showReviewForm && (
              <div className="mb-8">
                <ReviewForm
                  placeId={id}
                  branchId={selectedBranch._id}
                  onSubmit={handleSubmitReview}
                  onCancel={() => setShowReviewForm(false)}
                />
              </div>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No reviews yet. Be the first to review this branch!
                </p>
              ) : (
                reviews.map(review => (
                  <ReviewCard key={review._id} review={review} />
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default PlaceDetail;