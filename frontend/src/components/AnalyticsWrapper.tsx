import React, { useEffect } from 'react';
import styles from './AnalyticsWrapper.module.scss';
import { Box } from '@mui/material';

interface AnalyticsWrapperProps {
  id: string;
  children: React.ReactNode;
  domain?: string;
}

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ id, children, domain }) => {
  useEffect(() => {
    // Initialize the queue for events before the script loads
    (window as any).plausible = (window as any).plausible || function() {
      (window as any).plausible.q = (window as any).plausible.q || [];
      (window as any).plausible.q.push(arguments);
    };

    // Create and append the script
    const script = document.createElement('script');
    script.src = `https://plausible.io/js/script.js`;
    script.async = true;
    script.defer = true;
    if (domain) {
      script.setAttribute('data-domain', domain);
    }
    document.head.appendChild(script);

    // Track page views
    if (domain) {
      (window as any).plausible('pageview');
    }

    // Track scroll depth
    let timer: NodeJS.Timeout;
    const trackScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25) {
        if (domain) {
          (window as any).plausible('scroll-depth', { props: { depth: '25%' } });
        }
      }
      if (scrollPercentage >= 50) {
        if (domain) {
          (window as any).plausible('scroll-depth', { props: { depth: '50%' } });
        }
        (window as any).plausible('scroll-depth', { props: { depth: '50%' } });
      }
      if (scrollPercentage >= 75) {
        (window as any).plausible('scroll-depth', { props: { depth: '75%' } });
      }
      if (scrollPercentage >= 100) {
        (window as any).plausible('scroll-depth', { props: { depth: '100%' } });
      }
    };

    timer = setInterval(trackScroll, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [domain]);

  return <>{children}</>;
};

export default AnalyticsWrapper;
