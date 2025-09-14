import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import LoadingSpinner from '../common/LoadingSpinner';
import { 
  X, MapPin, Clock, DollarSign, Users, Building, ExternalLink, Calendar, Award, GraduationCap, Briefcase, AlertCircle
} from 'lucide-react';
import apiService from '../../services/api';

const InternshipDetailModal = ({ open, onClose, internshipId }) => {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open && internshipId) {
      fetchInternship();
    }
    // eslint-disable-next-line
  }, [open, internshipId]);

  const fetchInternship = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await apiService.getInternshipById(internshipId);
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Close details"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="large" text="Loading internship details..." />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">Internship Not Found</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={onClose} variant="outline">Close</Button>
            </div>
          ) : internship ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {internship.title || 'Internship Position'}
              </h1>
              <div className="flex items-center text-lg text-gray-600 mb-2">
                <Building className="h-5 w-5 mr-2" />
                <span>{internship.company_name || 'Company Name'}</span>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getModeColor(internship.mode)}`}>
                  {internship.mode || 'Not specified'}
                </span>
                {internship.certificate_provided && (
                  <span className="flex items-center text-green-600 text-xs">
                    <Award className="h-4 w-4 mr-1" />
                    Certificate Provided
                  </span>
                )}
              </div>
              {internship.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">About This Internship</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                    {internship.description}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="flex items-center mb-1">
                    <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                    <span>{internship.location_city || 'Location not specified'}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <Clock className="h-4 w-4 mr-1 text-blue-600" />
                    <span>{internship.duration_weeks ? `${internship.duration_weeks} weeks` : 'Not specified'}</span>
                  </div>
                  <div className="flex items-center mb-1">
                    <DollarSign className="h-4 w-4 mr-1 text-blue-600" />
                    <span>{formatStipend(internship.stipend)}</span>
                  </div>
                  {internship.min_education && (
                    <div className="flex items-center mb-1">
                      <GraduationCap className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{internship.min_education}</span>
                    </div>
                  )}
                </div>
                <div>
                  {internship.company_size && (
                    <div className="flex items-center mb-1">
                      <Building className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{internship.company_size}</span>
                    </div>
                  )}
                  {internship.sector && (
                    <div className="flex items-center mb-1">
                      <Briefcase className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{internship.sector}</span>
                    </div>
                  )}
                  {internship.slots_available && (
                    <div className="flex items-center mb-1">
                      <Users className="h-4 w-4 mr-1 text-blue-600" />
                      <span>{internship.slots_available} slots</span>
                    </div>
                  )}
                  {internship.remote_work_allowed !== undefined && (
                    <div className="flex items-center mb-1">
                      <span className="font-medium">Remote Work:</span>
                      <span className="ml-1">{internship.remote_work_allowed ? 'Yes' : 'No'}</span>
                    </div>
                  )}
                </div>
              </div>
              {internship.skills && internship.skills.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-1">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {internship.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-xs">
                {internship.posted_date && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                    <span>Posted: {formatDate(internship.posted_date)}</span>
                  </div>
                )}
                {internship.application_deadline && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-red-600" />
                    <span className="font-medium">Deadline: {formatDate(internship.application_deadline)}</span>
                  </div>
                )}
              </div>
              {internship.application_link && (
                <div className="text-center pt-4">
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
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetailModal;
