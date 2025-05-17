import { useLocation } from "wouter";
import { useEffect, useRef } from "react";

// Define the routes and their order for swipe navigation
// Consider moving this to a shared constants file if used elsewhere too
const ROUTES = [
  { path: '/', order: 0 },
  { path: '/projects', order: 1 },
  { path: '/contact', order: 2 },
];

const TOUCH_SWIPE_THRESHOLD = 80;
const MOUSE_SWIPE_THRESHOLD = 100;

export function useSwipeNavigation() { // NAMED EXPORT
  const [location, navigate] = useLocation();

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const mouseStartXRef = useRef(0);

  const getCurrentRouteIndex = () => {
    if (location.startsWith('/projects/')) {
      return ROUTES.findIndex(route => route.path === '/projects');
    }
    return ROUTES.findIndex(route => route.path === location);
  };

  const currentRouteIndex = getCurrentRouteIndex();

  const nextRoute =
    currentRouteIndex !== -1 && currentRouteIndex < ROUTES.length - 1
      ? ROUTES[currentRouteIndex + 1].path
      : null;
  const prevRoute =
    currentRouteIndex !== -1 && currentRouteIndex > 0
      ? ROUTES[currentRouteIndex - 1].path
      : null;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && nextRoute) {
      navigate(nextRoute);
    } else if (direction === 'right' && prevRoute) {
      navigate(prevRoute);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartXRef.current === 0 && touchStartYRef.current === 0) return;

      const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
      const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

      touchStartXRef.current = 0;
      touchStartYRef.current = 0;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > TOUCH_SWIPE_THRESHOLD) {
        handleSwipe(diffX > 0 ? 'left' : 'right');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        const targetTagName = e.target.tagName.toLowerCase();
        if (targetTagName === 'a' || targetTagName === 'button' || e.target.closest('a, button')) {
          isMouseDownRef.current = false;
          return;
        }
      }
      isMouseDownRef.current = true;
      mouseStartXRef.current = e.clientX;
      document.body.classList.add('no-select');
      document.body.classList.add('swipe-active');
    };

    const handleMouseUp = (e: MouseEvent) => {
      document.body.classList.remove('no-select');
      document.body.classList.remove('swipe-active');

      if (isMouseDownRef.current) {
        const diffX = mouseStartXRef.current - e.clientX;
        if (Math.abs(diffX) > MOUSE_SWIPE_THRESHOLD) {
          handleSwipe(diffX > 0 ? 'left' : 'right');
        }
      }
      isMouseDownRef.current = false;
    };

    const handleMouseLeave = () => {
      if (isMouseDownRef.current) {
        document.body.classList.remove('no-select');
        document.body.classList.remove('swipe-active');
        isMouseDownRef.current = false;
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.classList.remove('no-select');
      document.body.classList.remove('swipe-active');
    };
  }, [location, navigate, nextRoute, prevRoute]);

  // Return what's needed by consumers.
  // SwipeIndicators might need to know if next/prev routes exist.
  return {
    currentRouteIndex,
    hasNextRoute: nextRoute !== null,
    hasPrevRoute: prevRoute !== null,
  };
}