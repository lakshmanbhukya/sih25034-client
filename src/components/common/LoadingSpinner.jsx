import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  showText = true,
  className = '',
  color = 'blue'
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xlarge: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    gray: 'border-gray-600',
    white: 'border-white',
    primary: 'border-primary'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status" aria-label={text}>
      <div 
        className={`animate-spin rounded-full border-4 border-gray-200 ${colorClasses[color]} ${sizeClasses[size]} spinner-enhanced`}
        style={{
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent'
        }}
      ></div>
      {showText && text && (
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 font-medium animate-pulse">{text}</p>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
