import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Place API calls
export const getAllPlaces = async (category = '', search = '') => {
  const response = await axios.get(`${API_URL}/places`, {
    params: { category, search }
  });
  return response.data;
};

export const getPlace = async (id) => {
  const response = await axios.get(`${API_URL}/places/${id}`);
  return response.data;
};

export const createPlace = async (placeData) => {
  const response = await axios.post(`${API_URL}/places`, placeData);
  return response.data;
};

// Review API calls
export const getReviews = async (placeId) => {
  const response = await axios.get(`${API_URL}/reviews/place/${placeId}`);
  return response.data;
};

export const getBranchReviews = async (placeId, branchId) => {
  const response = await axios.get(`${API_URL}/places/${placeId}/branches/${branchId}/reviews`);
  return response.data;
};

export const createReview = async (reviewData) => {
  const response = await axios.post(`${API_URL}/reviews`, reviewData);
  return response.data;
};