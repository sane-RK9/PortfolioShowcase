import React, { useState, useEffect, useCallback } from 'react';

interface ThemeImageProps {
  lightImageSrc: string;
  darkImageSrc: string;
}

export function useThemeImage({ lightImageSrc, darkImageSrc }: ThemeImageProps): string {
  // useCallback helps to memoize updateImage function
  const getCurrentImageSrc = useCallback(() => {
    // Check for server-side rendering or environments without `document`
    if (typeof document === 'undefined') {
      return lightImageSrc; // Default to light image if document is not available
    }
    const isDarkModeActive = document.documentElement.classList.contains('dark');
    return isDarkModeActive ? darkImageSrc : lightImageSrc;
  }, [lightImageSrc, darkImageSrc]);

  const [currentImage, setCurrentImage] = useState<string>(getCurrentImageSrc);

  useEffect(() => {
    // Check for server-side rendering
    if (typeof document === 'undefined') {
      return;
    }

    // Set the initial image correctly after mount, in case the class was added by initial script
    setCurrentImage(getCurrentImageSrc());

    const observer = new MutationObserver(() => {
      setCurrentImage(getCurrentImageSrc());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, [getCurrentImageSrc]); // Re-run effect if getCurrentImageSrc changes (due to prop changes)

  return currentImage;
}