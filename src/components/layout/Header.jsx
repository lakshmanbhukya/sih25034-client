import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import login from '../auth/LoginForm';
import register from '../auth/RegisterForm';
import auth from '../auth/AuthPage';
import { 
  User, 
  LogOut, 
  Menu, 
  X,
  Home,
  Target,
  Briefcase,
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ currentPage, onPageChange, onMobileMenuToggle, isMobileMenuOpen }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recommendations', label: 'My Recommendations', icon: Target },
    { id: 'internships', label: 'All Internships', icon: Briefcase },
    { id: 'profile', label: 'My Profile', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">🎓</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Internship Finder
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  <span>Welcome, {user?.email?.split('@')[0] || 'User'}</span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <a><Button
                  onClick={handleLogin}
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                >
                  Login
                </Button>
                </a>
                <Button
                  onClick={handleRegister}
                  variant="default"
                  size="sm"
                  className="flex items-center"
                >
                  Register
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 rounded-lg mt-2 mb-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onPageChange(item.id);
                      onMobileMenuToggle();
                    }}
                    className={`flex items-center w-full px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                );
              })}
              
              {/* Mobile User Menu */}
              {isAuthenticated ? (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex items-center px-3 py-2 text-sm text-gray-700">
                    <User className="h-5 w-5 mr-3" />
                    <span>{user?.email?.split('@')[0] || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      onMobileMenuToggle();
                    }}
                    className="flex items-center w-full px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex flex-col space-y-2 px-3 py-2">
                    <Button
                      onClick={() => {
                        handleLogin();
                        onMobileMenuToggle();
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Login
                    </Button>
                    <Button
                      onClick={() => {
                        handleRegister();
                        onMobileMenuToggle();
                      }}
                      variant="default"
                      size="sm"
                      className="w-full"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
