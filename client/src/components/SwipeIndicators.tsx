import { useEffect, useState } from "react";
import { useSwipeNavigation } from "@/hooks/swipenavigation"; 

export default function SwipeIndicators() { // DEFAULT EXPORT for the component
  // Use the hook to get navigation state
  const { hasPrevRoute, hasNextRoute } = useSwipeNavigation();

  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [areIndicatorsPulsing, setAreIndicatorsPulsing] = useState(false);

  useEffect(() => {
    // Set visibility based on hook's output
    setShowLeftIndicator(hasPrevRoute);
    setShowRightIndicator(hasNextRoute);

    // Pulse animation logic (can remain similar)
    setAreIndicatorsPulsing(false);

    const pulseTimerShow = setTimeout(() => {
      if (hasPrevRoute || hasNextRoute) { // Only pulse if indicators are meant to be visible
        setAreIndicatorsPulsing(true);
      }
    }, 100);

    const pulseTimerHide = setTimeout(() => {
      setAreIndicatorsPulsing(false);
    }, 100 + 1500); // Visible for 1.5 seconds

    return () => {
      clearTimeout(pulseTimerShow);
      clearTimeout(pulseTimerHide);
    };
  }, [hasPrevRoute, hasNextRoute]); // Re-run effect if swipeability changes

  return (
    <>
      {showLeftIndicator && (
        <div
          className={`swipe-indicator swipe-indicator-left ${
            areIndicatorsPulsing ? 'active' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      )}

      {showRightIndicator && (
        <div
          className={`swipe-indicator swipe-indicator-right ${
            areIndicatorsPulsing ? 'active' : ''
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      )}

      <div className="swipe-progress"></div>
    </>
  );
}