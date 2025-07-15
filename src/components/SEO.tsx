import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
}

const SEO: React.FC<SeoProps> = ({ 
  title, 
  description, 
  image, 
  url, 
  keywords = ['full stack developer', 'portfolio', 'web developer'],
  author = 'Aradhana Singh',
  canonical = 'https://aradhana-portfolio.com'
}) => {
  const siteTitle = title ? `${title} | ${author}` : `${author} - Portfolio`;
  const siteDescription = description || 'Full Stack Developer | Portfolio Website | Chess Game | tic tac toe | memory match game';
  const siteImage = image || '/images/profile.jpg';
  const siteUrl = url || canonical;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content={author} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDescription} />
      <meta property="twitter:image" content={siteImage} />
      <meta property="twitter:creator" content={`@${author.replace(/\s+/g, '')}`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": author,
          "jobTitle": "Full Stack Developer",
          "image": siteImage,
          "url": siteUrl,
          "description": siteDescription,
          "sameAs": [
            "https://github.com/aradhanasinghmcscet",
            "https://linkedin.com/in/aradhanasinghmcscet"
          ],
          "potentialAction": {
            "@type": "InteractAction",
            "actionAccessibilityRequirement": {
              "@type": "ActionAccessSpecification",
              "availableOnDevice": "Desktop, Mobile"
            }
          }
        })}
      </script>

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    </Helmet>
  );
};

export default SEO;
