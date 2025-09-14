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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xlarge" text="Loading your internship finder..." />
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!isAuthenticated && currentPage !== 'home') {
    return (
      <ErrorBoundary>
        <AuthPage />
        <AccessibilityHelper />
      </ErrorBoundary>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />;
      case 'auth':
        return <AuthPage />;
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
