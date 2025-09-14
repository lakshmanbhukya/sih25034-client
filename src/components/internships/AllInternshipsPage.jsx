import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import InternshipCompactCard from './InternshipCompactCard';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle,
  Filter,
  Grid,
  List
} from 'lucide-react';
import apiService from '../../services/api';

const AllInternshipsPage = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total_internships: 0,
    has_next: false,
    has_prev: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const fetchInternships = async (page = 1, search = '') => {
    setLoading(true);
    setError('');
    try {
      let data;
      if (search) {
        data = await apiService.searchInternships({ q: search, page });
      } else {
        data = await apiService.getInternships(page);
      }
      setInternships(data.internships || []);
      setPagination(data.pagination || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      fetchInternships(newPage, searchTerm);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchInternships(1, searchTerm);
  };

  const handleViewDetails = (internshipId) => {
    navigate(`/internships/${internshipId}`);
  };

  // Remove local filtering, use backend results directly
  // const filteredInternships = internships.filter(...)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          All Available Internships
        </h1>
        <p className="text-gray-600 text-lg">
          Browse through all available internship opportunities
        </p>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search internships..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </form>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                disabled={loading}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                disabled={loading}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600">
          Showing {internships.length} of {pagination.total_internships} internships
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Unable to load internships</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Loading internships...
          </h3>
          <p className="text-gray-600">
            Please wait while we fetch the latest opportunities
          </p>
        </div>
      )}

      {/* Internships Grid/List */}
      {!loading && internships.length > 0 && (
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-4'
        }`}>
          {internships.map((internship, index) => (
            <InternshipCompactCard
              key={internship._id || index}
              internship={internship}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && internships.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No internships found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm 
              ? 'Try adjusting your search terms'
              : 'No internships are currently available'
            }
          </p>
          {searchTerm && (
            <Button 
              onClick={() => setSearchTerm('')}
              variant="outline"
            >
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.total_pages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <Button
            onClick={() => handlePageChange(pagination.current_page - 1)}
            disabled={!pagination.has_prev || loading}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    pageNum === pagination.current_page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {pagination.total_pages > 5 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <button
                  onClick={() => handlePageChange(pagination.total_pages)}
                  disabled={loading}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    pagination.total_pages === pagination.current_page
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pagination.total_pages}
                </button>
              </>
            )}
          </div>

          <Button
            onClick={() => handlePageChange(pagination.current_page + 1)}
            disabled={!pagination.has_next || loading}
            variant="outline"
            className="flex items-center"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Page Info */}
      {!loading && pagination.total_pages > 1 && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Page {pagination.current_page} of {pagination.total_pages}
        </div>
      )}
    </div>
  );
};

export default AllInternshipsPage;
