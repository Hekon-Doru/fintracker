import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg';
  className?: string;
  centered?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '',
  centered = false,
}) => {
  const sizeClasses: Record<string, string> = {
    small: 'h-4 w-4', sm: 'h-4 w-4',
    medium: 'h-8 w-8', md: 'h-8 w-8',
    large: 'h-12 w-12', lg: 'h-12 w-12',
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (centered) {
    return (
      <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
        {spinner}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
