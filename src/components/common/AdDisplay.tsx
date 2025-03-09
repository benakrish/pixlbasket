import { useEffect, useRef } from 'react';
import './AdDisplay.css';

interface AdDisplayProps {
  adSlot: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export const AdDisplay = ({ adSlot, format = 'auto', className = '' }: AdDisplayProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only run this if window.adsbygoogle is available (Google AdSense loaded)
    if (window.adsbygoogle && adRef.current) {
      try {
        // Clear any previous ad content
        if (adRef.current.innerHTML) {
          adRef.current.innerHTML = '';
        }
        
        // Create the ad ins element
        const adElement = document.createElement('ins');
        adElement.className = 'adsbygoogle';
        adElement.style.display = 'block';
        adElement.style.textAlign = 'center';
        
        // Set ad attributes
        adElement.setAttribute('data-ad-client', 'ca-pub-3178006671202717');
        adElement.setAttribute('data-ad-slot', adSlot);
        
        if (format === 'horizontal') {
          adElement.setAttribute('data-ad-format', 'horizontal');
        } else if (format === 'vertical') {
          adElement.setAttribute('data-ad-format', 'vertical');
        } else if (format === 'rectangle') {
          adElement.setAttribute('data-ad-format', 'rectangle');
        } else {
          adElement.setAttribute('data-ad-format', 'auto');
        }
        
        adElement.setAttribute('data-full-width-responsive', 'true');
        
        // Append to the container
        adRef.current.appendChild(adElement);
        
        // Push the ad for display
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('Error loading AdSense ad:', error);
      }
    }
  }, [adSlot, format]);

  return (
    <div 
      ref={adRef} 
      className={`ad-container ${format} ${className}`}
      data-testid="ad-container"
    ></div>
  );
};

// Make sure to add this to the Window interface
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}