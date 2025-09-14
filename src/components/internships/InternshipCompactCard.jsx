import React from 'react';
import { MapPin, Clock, DollarSign, Building, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

const InternshipCompactCard = ({ internship, onViewDetails }) => {
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
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
            {internship.title || 'Internship Position'}
          </h3>
          <div className="flex items-center text-gray-600 text-sm">
            <Building className="h-4 w-4 mr-1" />
            <span className="truncate">{internship.company_name || 'Company Name'}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 flex-shrink-0 ${getModeColor(internship.mode)}`}>
          {internship.mode || 'Not specified'}
        </span>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="truncate">
            {internship.location_city || 'Location not specified'}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>
            {internship.duration_weeks ? `${internship.duration_weeks}w` : 'N/A'}
          </span>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-3 w-3 mr-1" />
          <span className="font-medium">
            {formatStipend(internship.stipend)}
          </span>
        </div>
        <div className="text-right">
          {internship.sector && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {internship.sector}
            </span>
          )}
        </div>
      </div>

      {/* Skills Preview */}
      {internship.skills && internship.skills.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {internship.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {skill}
              </span>
            ))}
            {internship.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{internship.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => onViewDetails(internship._id)}
          variant="outline"
          size="sm"
          className="flex-1"
        >
          View Details
        </Button>
        {internship.application_link && (
          <Button
            onClick={() => window.open(internship.application_link, '_blank', 'noopener,noreferrer')}
            size="sm"
            className="flex-1"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Apply
          </Button>
        )}
      </div>
    </div>
  );
};

export default InternshipCompactCard;
