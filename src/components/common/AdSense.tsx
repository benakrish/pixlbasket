import { useEffect } from 'react';

export const AdSense = () => {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3178006671202717';
    script.crossOrigin = 'anonymous';
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Create meta tag
    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = 'ca-pub-3178006671202717';
    document.head.appendChild(meta);
    
    // Cleanup on component unmount
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(meta);
    };
  }, []);
  
  // This component doesn't render anything
  return null;
};