'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    restaurant_id: '',
    title: '',
    timing: '',
    price: '',
    rating: '',
    tags: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  console.log("restaurants",restaurants)

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch('/api/restaurant');
      const data = await response.json();
      setRestaurants(data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing 
        ? `/api/restaurant/${formData.restaurant_id}`  // URL for update
        : '/api/restaurant';           // URL for create
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        // Reset form
        setFormData({
          restaurant_id: '',
          title: '',
          timing: '',
          price: '',
          rating: '',
          tags: ''
        });
        // Reset editing state
        setIsEditing(false);
        setEditId(null);
        // Refresh the list
        fetchRestaurants();
      }
    } catch (error) {
      console.error('Error saving restaurant:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this restaurant?')) {
      return;
    }

    try {
      const response = await fetch(`/api/restaurant/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchRestaurants();
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Restaurant Management</h1>
      
      {/* Add Restaurant Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Restaurant ID</label>
              <input
                type="text"
                name="restaurant_id"
                value={formData.restaurant_id}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Timing</label>
              <input
                type="text"
                name="timing"
                value={formData.timing}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <input
                type="text"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Separate tags with commas"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
          </button>
        </form>
      </div>

      {/* Restaurant List */}
      <div className="bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold p-6 border-b">Restaurant List</h2>
        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {restaurants.map((restaurant) => (
                  <tr key={restaurant.restaurant_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.restaurant_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.timing}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{restaurant.tags}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setEditId(restaurant.restaurant_id);
                          setFormData(restaurant);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(restaurant.restaurant_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
