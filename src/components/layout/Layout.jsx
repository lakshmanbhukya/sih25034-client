import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ 
  children, 
  currentPage, 
  onPageChange, 
  onMobileMenuToggle, 
  isMobileMenuOpen 
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Header
        currentPage={currentPage}
        onPageChange={onPageChange}
        onMobileMenuToggle={onMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <main className="flex-1 page-transition">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
