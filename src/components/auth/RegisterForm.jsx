import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Eye, EyeOff, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin }) => {
  const { register, loading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear API error when user starts typing
    if (error) {
      clearError();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await register(formData);
      setSuccess(true);
      // Auto switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      // Error is handled by the context
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Account Created Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          You can now sign in with your credentials.
        </p>
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting to login...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 text-lg">
          Join us to find amazing internships
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
            👤 Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                validationErrors.username ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Choose a username"
              disabled={loading}
            />
          </div>
          {validationErrors.username && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.username}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            📧 Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
              disabled={loading}
            />
          </div>
          {validationErrors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            🔒 Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                validationErrors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {validationErrors.password && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            🔒 Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg ${
                validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={loading}
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {validationErrors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* API Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 text-lg font-semibold"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </Button>

        {/* Switch to Login */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-blue-600 hover:text-blue-800 font-medium underline"
              disabled={loading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
