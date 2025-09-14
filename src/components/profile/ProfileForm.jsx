import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { User, MapPin, GraduationCap, Briefcase, AlertCircle, CheckCircle, Plus, X } from 'lucide-react';
import apiService from '../../services/api';

const ProfileForm = ({ onProfileUpdate }) => {
  const [formData, setFormData] = useState({
    skills: [],
    sectors: [],
    education: '',
    location: ''
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [newSector, setNewSector] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const skillSuggestions = [
    'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'HTML', 'CSS',
    'MongoDB', 'SQL', 'Git', 'Communication', 'Teamwork', 'Problem Solving',
    'Leadership', 'Time Management', 'Writing', 'Design', 'Marketing'
  ];

  const sectorSuggestions = [
    'Marketing', 'Consulting', 'Finance', 'Retail', 'Manufacturing',
    'Healthcare', 'Media', 'Education', 'Agriculture', 'Technology'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear errors when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleEducationChange = (value) => {
    setFormData(prev => ({
      ...prev,
      education: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addSector = () => {
    if (newSector.trim() && !formData.sectors.includes(newSector.trim())) {
      setFormData(prev => ({
        ...prev,
        sectors: [...prev.sectors, newSector.trim()]
      }));
      setNewSector('');
    }
  };

  const removeSector = (sectorToRemove) => {
    setFormData(prev => ({
      ...prev,
      sectors: prev.sectors.filter(sector => sector !== sectorToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await apiService.updateProfile(formData);
      setSuccess(true);
      if (onProfileUpdate) {
        onProfileUpdate(formData);
      }
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <User className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Complete Your Profile
        </h1>
        <p className="text-gray-600 text-lg">
          Help us find the best internships for you
        </p>
      </div>

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-sm text-green-700">Profile updated successfully!</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Skills */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            <Briefcase className="inline h-5 w-5 mr-2" />
            What skills do you have?
          </label>
          
          {/* Current Skills */}
          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add New Skill */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Add a skill"
              disabled={loading}
            />
            <Button
              type="button"
              onClick={addSkill}
              disabled={loading || !newSkill.trim()}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Skill Suggestions */}
          <div className="text-sm text-gray-500 mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {skillSuggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => {
                  if (!formData.skills.includes(skill)) {
                    setFormData(prev => ({
                      ...prev,
                      skills: [...prev.skills, skill]
                    }));
                  }
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                disabled={loading || formData.skills.includes(skill)}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Sectors */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            <Briefcase className="inline h-5 w-5 mr-2" />
            What industries interest you?
          </label>
          
          {/* Current Sectors */}
          {formData.sectors.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.sectors.map((sector, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                >
                  {sector}
                  <button
                    type="button"
                    onClick={() => removeSector(sector)}
                    className="ml-2 text-green-600 hover:text-green-800"
                    disabled={loading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add New Sector */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newSector}
              onChange={(e) => setNewSector(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Add an industry"
              disabled={loading}
            />
            <Button
              type="button"
              onClick={addSector}
              disabled={loading || !newSector.trim()}
              variant="outline"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Sector Suggestions */}
          <div className="text-sm text-gray-500 mb-2">Suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {sectorSuggestions.map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => {
                  if (!formData.sectors.includes(sector)) {
                    setFormData(prev => ({
                      ...prev,
                      sectors: [...prev.sectors, sector]
                    }));
                  }
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                disabled={loading || formData.sectors.includes(sector)}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            <GraduationCap className="inline h-5 w-5 mr-2" />
            What is your highest education level?
          </label>
          <select
            value={formData.education}
            onChange={(e) => handleEducationChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">Select your education level</option>
            <option value="10th">10th Pass</option>
            <option value="12th">12th Pass</option>
            <option value="diploma">Diploma</option>
            <option value="graduate">Graduate</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Select your highest completed education level
          </p>
        </div>

        {/* Location */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-3">
            <MapPin className="inline h-5 w-5 mr-2" />
            Where are you located?
          </label>
          <input
            type="text"
            list="locations"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your city (e.g., Mumbai, Delhi, Bangalore)"
            disabled={loading}
          />
          <datalist id="locations">
            <option value="Bangalore" />
            <option value="Ahmedabad" />
            <option value="Vadodara" />
            <option value="Coimbatore" />
            <option value="Delhi" />
            <option value="Kolkata" />
            <option value="Chennai" />
            <option value="Bhopal" />
            <option value="Indore" />
            <option value="Mumbai" />
            <option value="Lucknow" />
            <option value="Hyderabad" />
            <option value="Pune" />
            <option value="Kochi" />
            <option value="Jaipur" />
          </datalist>
          <p className="mt-1 text-sm text-gray-500">
            This helps us find internships near you
          </p>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <Button
            type="submit"
            className="px-8 py-3 text-lg font-semibold"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Saving Profile...
              </div>
            ) : (
              'Save Profile'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
