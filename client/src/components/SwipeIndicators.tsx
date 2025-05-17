import { useLocation } from "wouter";
import { useEffect, useState } from "react";

// Define routes in order for swipe navigation
const ROUTES = [
  { path: '/', order: 0 },
  { path: '/projects', order: 1 },
  { path: '/contact', order: 2 },
];

export default function SwipeIndicators() {
  const [location] = useLocation();
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  
  useEffect(() => {
    // Determine if we should show indicators based on current route
    const currentIndex = ROUTES.findIndex(route => {
      if (location.startsWith('/projects/')) {
        return route.path === '/projects';
      }
      return route.path === location;
    });
    
    setShowLeftIndicator(currentIndex > 0);
    setShowRightIndicator(currentIndex < ROUTES.length - 1);
    
    // Show indicators briefly on page load
    const showTimeout = setTimeout(() => {
      const leftIndicator = document.querySelector('.swipe-indicator-left');
      const rightIndicator = document.querySelector('.swipe-indicator-right');
      
      if (leftIndicator) leftIndicator.classList.add('active');
      if (rightIndicator) rightIndicator.classList.add('active');
      
      // Hide indicators after a moment
      const hideTimeout = setTimeout(() => {
        if (leftIndicator) leftIndicator.classList.remove('active');
        if (rightIndicator) rightIndicator.classList.remove('active');
      }, 2000);
      
      return () => clearTimeout(hideTimeout);
    }, 500);
    
    return () => clearTimeout(showTimeout);
  }, [location]);
  
  return (
    <>
      {showLeftIndicator && (
        <div className="swipe-indicator swipe-indicator-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      )}
      
      {showRightIndicator && (
        <div className="swipe-indicator swipe-indicator-right">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      )}
      
      <div className="swipe-progress"></div>
    </>
  );
}