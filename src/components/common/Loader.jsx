import React from 'react';
import ContentLoader from 'react-content-loader';

/**
 * A versatile loader component with gold-themed styling
 * 
 * @param {string} type - The type of content to display ('property', 'details', 'card', or 'banner')
 * @param {number} row - Number of rows for text-based loaders (only for text type)
 * @param {Object} style - Additional inline styles
 * @param {string} backgroundColor - Background color of the loader
 * @param {string} foregroundColor - Foreground color for the animated gradient (gold by default)
 * @param {Object} props - Any additional props to pass to the ContentLoader
 */
const GoldenLoader = ({ 
  type = 'property', 
  row = 3,
  style = {},
  backgroundColor = '#f0f0f0',
  foregroundColor = '#d4af37',
  ...props 
}) => {
  // Configure based on a loader type
  const getLoaderConfig = () => {
    switch (type) {
      case 'details':
        return {
          width: 1000,
          height: 600,
          viewBox: "0 0 1000 600",
          shapes: (
            <>
              {/* Header section */}
              <rect x="0" y="0" rx="5" ry="5" width="400" height="40" />
              <rect x="0" y="60" rx="3" ry="3" width="250" height="20" />
              
              {/* Image gallery */}
              <rect x="0" y="100" rx="8" ry="8" width="600" height="350" />
              
              {/* Property details */}
              <rect x="620" y="100" rx="4" ry="4" width="350" height="40" />
              <rect x="620" y="160" rx="3" ry="3" width="380" height="15" />
              <rect x="620" y="190" rx="3" ry="3" width="350" height="15" />
              <rect x="620" y="220" rx="3" ry="3" width="370" height="15" />
              <rect x="620" y="250" rx="3" ry="3" width="300" height="15" />
              
              {/* Features */}
              <rect x="620" y="290" rx="4" ry="4" width="200" height="30" />
              <rect x="620" y="340" rx="3" ry="3" width="80" height="25" />
              <rect x="720" y="340" rx="3" ry="3" width="80" height="25" />
              <rect x="820" y="340" rx="3" ry="3" width="80" height="25" />
              
              {/* Contact section */}
              <rect x="620" y="390" rx="5" ry="5" width="380" height="160" />
            </>
          )
        };
      default:
        return {
          width: 320,
          height: 400,
          viewBox: "0 0 320 400",
          shapes: (
            <>
              {/* Property image */}
              <rect x="0" y="0" rx="8" ry="8" width="320" height="200" />
              
              {/* Property title */}
              <rect x="0" y="215" rx="4" ry="4" width="240" height="28" />
              
              {/* Property location */}
              <rect x="0" y="255" rx="3" ry="3" width="180" height="20" />
              
              {/* Property features */}
              <rect x="0" y="290" rx="3" ry="3" width="50" height="20" />
              <rect x="60" y="290" rx="3" ry="3" width="50" height="20" />
              <rect x="120" y="290" rx="3" ry="3" width="80" height="20" />
              
              {/* Price */}
              <rect x="0" y="330" rx="4" ry="4" width="140" height="36" />
            </>
          )
        };
    }
  };
  
  const config = getLoaderConfig();
  
  return (
    <ContentLoader
      speed={2}
      backgroundColor={backgroundColor}
      foregroundColor={foregroundColor}
      style={{ ...style }}
      {...config}
      {...props}
    >
      {config.shapes}
    </ContentLoader>
  );
};

export default GoldenLoader;