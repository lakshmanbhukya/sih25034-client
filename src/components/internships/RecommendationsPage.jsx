import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import InternshipCard from './InternshipCard';
import InternshipCompactCard from './InternshipCompactCard';
import InternshipDetailModal from './InternshipDetailModal';
import { 
  Search, 
  MapPin, 
  Filter, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Target,
  Globe,
  TrendingUp
} from 'lucide-react';
import apiService from '../../services/api';

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [maxDistance, setMaxDistance] = useState(150);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [selectedInternshipId, setSelectedInternshipId] = useState(null);

  const fetchRecommendations = async () => {
    setLoading(true);
    setError('');
    
    try {
      const data = await apiService.getRecommendations(maxDistance);
      setRecommendations(data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const handleApply = (internship) => {
    if (internship.application_link) {
      window.open(internship.application_link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleRefresh = () => {
    fetchRecommendations();
  };

  const handleDistanceChange = (newDistance) => {
    setMaxDistance(newDistance);
  };

  const handleViewDetails = (id) => setSelectedInternshipId(id);

  const getRecommendationCount = () => {
    if (!recommendations) return 0;
    const nearby = recommendations.recommendations?.nearby_internships?.length || 0;
    const remote = recommendations.recommendations?.remote_internships?.length || 0;
    return nearby + remote;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <Target className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Your Personalized Recommendations
        </h1>
        <p className="text-gray-600 text-lg">
          We found {getRecommendationCount()} internships that match your profile
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Distance Filter */}
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">
              Search within:
            </label>
            <select
              value={maxDistance}
              onChange={(e) => handleDistanceChange(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
              <option value={150}>150 km</option>
              <option value={200}>200 km</option>
              <option value={500}>500 km</option>
            </select>
          </div>

          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            disabled={loading}
            variant="outline"
            className="flex items-center"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Recommendations
          </Button>
        </div>

        {/* Last Updated */}
        {lastUpdated && (
          <div className="mt-4 text-sm text-gray-500 text-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Unable to load recommendations</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Finding your perfect internships...
          </h3>
          <p className="text-gray-600">
            This may take a few moments
          </p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations && !loading && (
        <div className="space-y-8">
          {/* User Profile Summary */}
          {recommendations.user_profile && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">
                📋 Your Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-blue-800">Skills:</span>
                  <p className="text-blue-700">
                    {recommendations.user_profile.skills?.length > 0 
                      ? recommendations.user_profile.skills.join(', ')
                      : 'Not specified'
                    }
                  </p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Sectors:</span>
                  <p className="text-blue-700">
                    {recommendations.user_profile.sectors?.length > 0 
                      ? recommendations.user_profile.sectors.join(', ')
                      : 'Not specified'
                    }
                  </p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Education:</span>
                  <p className="text-blue-700">
                    {recommendations.user_profile.education_level || 'Not specified'}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-blue-800">Location:</span>
                  <p className="text-blue-700">
                    {recommendations.user_profile.location || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Nearby Internships */}
          {recommendations.recommendations?.nearby_internships?.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Nearby Internships ({recommendations.recommendations.nearby_internships.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.recommendations.nearby_internships.slice(0, 5).map((internship, index) => (
                  <InternshipCompactCard
                    key={internship._id || index}
                    internship={internship}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Remote Internships */}
          {recommendations.recommendations?.remote_internships?.length > 0 && (
            <div>
              <div className="flex items-center mb-6">
                <Globe className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Remote Internships ({recommendations.recommendations.remote_internships.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.recommendations.remote_internships.slice(0, 5).map((internship, index) => (
                  <InternshipCompactCard
                    key={internship._id || index}
                    internship={internship}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Recommendations */}
          {getRecommendationCount() === 0 && !loading && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No recommendations found
              </h3>
              <p className="text-gray-600 mb-4">
                Try updating your profile or adjusting your search distance
              </p>
              <Button onClick={handleRefresh} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>
      )}
      <InternshipDetailModal
        open={!!selectedInternshipId}
        internshipId={selectedInternshipId}
        onClose={() => setSelectedInternshipId(null)}
      />
    </div>
  );
};

export default RecommendationsPage;
