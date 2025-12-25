import React, { useState, useEffect } from 'react';
import { getAllPlaces } from '../services/api';
import PlaceCard from '../components/PlaceCard';

function Home() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const categories = ['All', 'Restaurant', 'Hotel', 'Club', 'Park', 'Cafe', 'Other'];

  useEffect(() => {
    fetchPlaces();
  }, [category, search]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const data = await getAllPlaces(
        category === 'All' ? '' : category,
        search
      );
      setPlaces(data);
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">LocalReview Hub</h1>
          <p className="text-blue-100 mt-2">Find and review local businesses</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search for places..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  category === cat || (category === '' && cat === 'All')
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading places...</p>
          </div>
        ) : places.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No places found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map(place => (
              <PlaceCard key={place._id} place={place} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;