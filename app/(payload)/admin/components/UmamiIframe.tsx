"use client"
import React, { useState } from 'react';

interface UmamiIframeProps {
  src: string;
  width?: string;
  height?: string;
}

const LoadingSpinner = () => (
  <div className="umami-loading">
    <div className="umami-spinner"></div>
  </div>
);

export const UmamiIframe: React.FC<UmamiIframeProps> = ({ src, width = '100%', height = '500px' }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="umami-container">
      {isLoading && <LoadingSpinner />}
      <iframe
        src={src}
        width={width}
        height={height}
        style={{ border: 'none' }}
        title="Umami Analytics"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

export const styles = `
.umami-container {
  position: relative;
  width: 100%;
}

.umami-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.umami-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

