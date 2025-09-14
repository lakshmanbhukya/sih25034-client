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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        currentPage={currentPage}
        onPageChange={onPageChange}
        onMobileMenuToggle={onMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
