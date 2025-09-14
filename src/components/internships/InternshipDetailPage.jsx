import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Building, 
  ExternalLink, 
  Calendar, 
  Award,
  GraduationCap,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import apiService from '../../services/api';

const InternshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInternship();
  }, [id]);

  const fetchInternship = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getInternshipById(id);
      setInternship(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatStipend = (stipend) => {
    if (!stipend) return 'Unpaid';
    return `₹${stipend.toLocaleString()}`;
  };

  const getModeColor = (mode) => {
    switch (mode?.toLowerCase()) {
      case 'remote':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'hybrid':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'onsite':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xlarge" text="Loading internship details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Internship Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The internship you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate('/internships')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Internships
          </Button>
        </div>
      </div>
    );
  }

  if (!internship) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {internship.title || 'Internship Position'}
                </h1>
                <div className="flex items-center text-xl text-gray-600 mb-4">
                  <Building className="h-6 w-6 mr-2" />
                  <span>{internship.company_name || 'Company Name'}</span>
                </div>
                
                {/* Mode Badge */}
                <div className="flex items-center space-x-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getModeColor(internship.mode)}`}>
                    {internship.mode || 'Not specified'}
                  </span>
                  {internship.certificate_provided && (
                    <span className="flex items-center text-green-600 text-sm">
                      <Award className="h-4 w-4 mr-1" />
                      Certificate Provided
                    </span>
                  )}
                </div>
              </div>

              {/* Apply Button */}
              {internship.application_link && (
                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <Button
                    onClick={() => window.open(internship.application_link, '_blank', 'noopener,noreferrer')}
                    size="lg"
                    className="w-full lg:w-auto"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Apply Now
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Description */}
            {internship.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Internship</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {internship.description}
                </p>
              </div>
            )}

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Location
                  </h3>
                  <p className="text-gray-700">
                    {internship.location_city && internship.location_state
                      ? `${internship.location_city}, ${internship.location_state}`
                      : internship.location_city || 'Location not specified'
                    }
                  </p>
                </div>

                {/* Duration */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-600" />
                    Duration
                  </h3>
                  <p className="text-gray-700">
                    {internship.duration_weeks ? `${internship.duration_weeks} weeks` : 'Not specified'}
                  </p>
                </div>

                {/* Stipend */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-blue-600" />
                    Stipend
                  </h3>
                  <p className="text-gray-700 font-medium text-lg">
                    {formatStipend(internship.stipend)}
                  </p>
                </div>

                {/* Education Required */}
                {internship.min_education && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
                      Education Required
                    </h3>
                    <p className="text-gray-700">{internship.min_education}</p>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Company Size */}
                {internship.company_size && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600" />
                      Company Size
                    </h3>
                    <p className="text-gray-700">{internship.company_size}</p>
                  </div>
                )}

                {/* Sector */}
                {internship.sector && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Briefcase className="h-5 w-5 mr-2 text-blue-600" />
                      Industry
                    </h3>
                    <p className="text-gray-700">{internship.sector}</p>
                  </div>
                )}

                {/* Slots Available */}
                {internship.slots_available && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-blue-600" />
                      Available Positions
                    </h3>
                    <p className="text-gray-700">{internship.slots_available} slots available</p>
                  </div>
                )}

                {/* Remote Work */}
                {internship.remote_work_allowed !== undefined && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Remote Work
                    </h3>
                    <p className="text-gray-700">
                      {internship.remote_work_allowed ? 'Yes, remote work is allowed' : 'No, on-site only'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {internship.skills && internship.skills.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {internship.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {internship.posted_date && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                    Posted Date
                  </h3>
                  <p className="text-gray-700">{formatDate(internship.posted_date)}</p>
                </div>
              )}
              
              {internship.application_deadline && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-600" />
                    Application Deadline
                  </h3>
                  <p className="text-gray-700 font-medium text-red-600">
                    {formatDate(internship.application_deadline)}
                  </p>
                </div>
              )}
            </div>

            {/* Apply Button (Bottom) */}
            {internship.application_link && (
              <div className="text-center pt-6 border-t border-gray-200">
                <Button
                  onClick={() => window.open(internship.application_link, '_blank', 'noopener,noreferrer')}
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Apply for This Internship
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailPage;
