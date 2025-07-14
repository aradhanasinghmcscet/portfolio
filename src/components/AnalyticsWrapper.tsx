import React, { useEffect } from 'react';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Initialize Plausible if not already initialized
    if (!window.plausible) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://plausible.io/js/plausible.js';
      script.setAttribute('data-domain', 'your-domain.com'); // Replace with your actual domain
      document.head.appendChild(script);
    }

    // Track pageview
    if (window.plausible) {
      window.plausible('pageview');
    }
  }, []);

  return <>{children}</>;
};

export default AnalyticsWrapper;
