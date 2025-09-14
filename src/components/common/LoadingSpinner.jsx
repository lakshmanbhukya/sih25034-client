import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  text = 'Loading...', 
  showText = true,
  className = '',
  color = 'primary'
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-10 w-10',
    large: 'h-16 w-16',
    xlarge: 'h-20 w-20'
  };

  const dotSizes = {
    small: 'w-1.5 h-1.5',
    medium: 'w-2 h-2',
    large: 'w-3 h-3',
    xlarge: 'w-4 h-4'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} role="status" aria-label={text}>
      {/* Modern layered spinner */}
      <div className="relative">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full`}></div>
        <div className={`${sizeClasses[size]} border-4 border-transparent border-t-primary-500 rounded-full animate-spin absolute top-0 left-0`}></div>
        <div className={`${sizeClasses[size]} border-4 border-transparent border-r-brand-400 rounded-full animate-spin absolute top-0 left-0`} style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      
      {/* Animated dots */}
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${dotSizes[size]} bg-primary-400 rounded-full animate-pulse`}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
      
      {showText && text && (
        <p className="mt-4 text-sm text-gray-600 font-semibold animate-pulse">{text}</p>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
