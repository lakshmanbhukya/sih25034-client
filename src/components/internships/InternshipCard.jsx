import React from 'react';
import { MapPin, Clock, DollarSign, Users, Building, ExternalLink, Calendar, Award } from 'lucide-react';
import { Button } from '../ui/button';

const InternshipCard = ({ internship, onApply }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
        return 'bg-green-100 text-green-800';
      case 'hybrid':
        return 'bg-yellow-100 text-yellow-800';
      case 'onsite':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {internship.title || 'Internship Position'}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building className="h-4 w-4 mr-2" />
            <span className="font-medium">{internship.company_name || 'Company Name'}</span>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getModeColor(internship.mode)}`}>
            {internship.mode || 'Not specified'}
          </span>
          {internship.certificate_provided && (
            <span className="flex items-center text-green-600 text-sm">
              <Award className="h-4 w-4 mr-1" />
              Certificate
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {internship.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {internship.description}
        </p>
      )}

      {/* Skills */}
      {internship.skills && internship.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {internship.skills.slice(0, 5).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {internship.skills.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{internship.skills.length - 5} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Location */}
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">
            {internship.location_city && internship.location_state
              ? `${internship.location_city}, ${internship.location_state}`
              : internship.location_city || 'Location not specified'
            }
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm">
            {internship.duration_weeks ? `${internship.duration_weeks} weeks` : 'Duration not specified'}
          </span>
        </div>

        {/* Stipend */}
        <div className="flex items-center text-gray-600">
          <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
          <span className="text-sm font-medium">
            {formatStipend(internship.stipend)}
          </span>
        </div>

        {/* Slots Available */}
        {internship.slots_available && (
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-sm">
              {internship.slots_available} slots available
            </span>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="space-y-2 mb-6 text-sm text-gray-600">
        {internship.min_education && (
          <div>
            <span className="font-medium">Education Required:</span> {internship.min_education}
          </div>
        )}
        {internship.company_size && (
          <div>
            <span className="font-medium">Company Size:</span> {internship.company_size}
          </div>
        )}
        {internship.sector && (
          <div>
            <span className="font-medium">Sector:</span> {internship.sector}
          </div>
        )}
      </div>

      {/* Dates */}
      <div className="space-y-2 mb-6 text-sm">
        {internship.posted_date && (
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>Posted: {formatDate(internship.posted_date)}</span>
          </div>
        )}
        {internship.application_deadline && (
          <div className="flex items-center text-red-600">
            <Calendar className="h-4 w-4 mr-2 text-red-400" />
            <span className="font-medium">Deadline: {formatDate(internship.application_deadline)}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        {internship.application_link && (
          <Button
            onClick={() => onApply && onApply(internship)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        )}
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            // You could implement a "Save" or "View Details" functionality
            console.log('View details for:', internship.title);
          }}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default InternshipCard;
