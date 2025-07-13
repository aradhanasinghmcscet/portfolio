import React, { useEffect } from 'react';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  useEffect(() => {
    // Track pageview
    if ((window as any).plausible) {
      (window as any).plausible('pageview');
    }
  }, []);

  return <>{children}</>;
};

export default AnalyticsWrapper;
