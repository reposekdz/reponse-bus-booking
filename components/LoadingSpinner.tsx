import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-blue-200/50 rounded-full"></div>
        <div 
          className="absolute inset-0 border-4 border-t-blue-500 border-l-blue-500 border-b-transparent border-r-transparent rounded-full animate-spin"
          style={{ animation: 'spin 1s linear infinite' }}
        ></div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default LoadingSpinner;