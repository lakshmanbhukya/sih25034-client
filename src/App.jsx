import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './components/pages/HomePage';
import AuthPage from './components/auth/AuthPage';
import ProfileForm from './components/profile/ProfileForm';
import RecommendationsPage from './components/internships/RecommendationsPage';
import AllInternshipsPage from './components/internships/AllInternshipsPage';
import InternshipDetailPage from './components/internships/InternshipDetailPage';
import AccessibilityHelper from './components/common/AccessibilityHelper';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  // Redirect to auth if not authenticated and trying to access protected pages
  useEffect(() => {
    const protectedPages = ['recommendations', 'profile'];
    if (!isAuthenticated && protectedPages.includes(currentPage)) {
      setCurrentPage('auth');
    }
  }, [isAuthenticated, currentPage]);

  const handlePageChange = (page, options = {}) => {
    setCurrentPage(page);
    if (page === 'auth' && options.mode) {
      setAuthMode(options.mode);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-brand-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">🎓</span>
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-2">InternshipHub</h2>
            <p className="text-gray-600">Preparing your experience...</p>
          </div>
          <LoadingSpinner size="large" text="Loading your internship finder..." />
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated && currentPage !== 'home') {
    return (
      <ErrorBoundary>
        <AuthPage initialMode={authMode} onBack={() => handlePageChange('home')} />
        <AccessibilityHelper />
      </ErrorBoundary>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'auth':
        return <AuthPage initialMode={authMode} onBack={() => handlePageChange('home')} />;
      case 'profile':
        return <ProfileForm onProfileUpdate={() => setCurrentPage('recommendations')} />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'internships':
        return <AllInternshipsPage />;
      default:
        return <HomePage onPageChange={handlePageChange} />;
    }
  };

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Internship Detail Route */}
          <Route 
            path="/internships/:id" 
            element={
              <InternshipDetailPage />
            } 
          />
          
          {/* Main App Routes */}
          <Route 
            path="/*" 
            element={
              <Layout
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onMobileMenuToggle={handleMobileMenuToggle}
                isMobileMenuOpen={isMobileMenuOpen}
              >
                {renderPage()}
              </Layout>
            } 
          />
        </Routes>
        <AccessibilityHelper />
      </Router>
    </ErrorBoundary>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
