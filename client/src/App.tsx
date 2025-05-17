import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Project from "@/pages/project";
import Contact from "@/pages/contact";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import SwipeIndicators from "@/components/SwipeIndicators";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import "@/swipe-navigation.css";

// Define the routes and their order for swipe navigation
const ROUTES = [
  { path: '/', order: 0 },
  { path: '/projects', order: 1 },
  { path: '/contact', order: 2 },
  // Project detail pages are treated specially
];

// Custom hook for swipe navigation
function useSwipeNavigation() {
  const [location, navigate] = useLocation();
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  
  // Find next and previous routes based on current location
  const getCurrentRouteIndex = () => {
    // Handle project detail pages
    if (location.startsWith('/projects/')) {
      return ROUTES.findIndex(route => route.path === '/projects');
    }
    return ROUTES.findIndex(route => route.path === location);
  };
  
  const currentRouteIndex = getCurrentRouteIndex();
  const nextRoute = currentRouteIndex < ROUTES.length - 1 ? ROUTES[currentRouteIndex + 1].path : null;
  const prevRoute = currentRouteIndex > 0 ? ROUTES[currentRouteIndex - 1].path : null;
  
  // Handle navigation based on swipe direction
  const handleSwipe = (direction: 'left' | 'right') => {
    // Don't navigate away from project detail pages to other project details
    if (location.startsWith('/projects/') && direction === 'left' && nextRoute === '/projects') {
      return;
    }
    
    if (direction === 'left' && nextRoute) {
      navigate(nextRoute);
    } else if (direction === 'right' && prevRoute) {
      navigate(prevRoute);
    }
  };
  
  // Set up touch and mouse event handlers
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setStartX(e.touches[0].clientX);
      setStartY(e.touches[0].clientY);
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const diffX = startX - e.changedTouches[0].clientX;
      const diffY = startY - e.changedTouches[0].clientY;
      
      // Only register horizontal swipes (prevent conflicts with scrolling)
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 80) {
        handleSwipe(diffX > 0 ? 'left' : 'right');
      }
    };
    
    // Mouse events for desktop swipe
    let isMouseDown = false;
    let mouseStartX = 0;
    
    const handleMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      mouseStartX = e.clientX;
    };
    
    const handleMouseUp = (e: MouseEvent) => {
      if (isMouseDown) {
        const diff = mouseStartX - e.clientX;
        if (Math.abs(diff) > 100) { // Higher threshold for mouse to avoid accidental swipes
          handleSwipe(diff > 0 ? 'left' : 'right');
        }
        isMouseDown = false;
      }
    };
    
    // Add event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Clean up
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [startX, startY, location, navigate]);
  
  return {
    currentRouteIndex,
    nextRoute,
    prevRoute
  };
}

function Router() {
  const [location] = useLocation();
  const [direction, setDirection] = useState(0);
  const [prevLocation, setPrevLocation] = useState(location);
  const { currentRouteIndex } = useSwipeNavigation();
  
  // Track navigation direction for animations
  useEffect(() => {
    if (location !== prevLocation) {
      const prevIndex = ROUTES.findIndex(route => {
        if (prevLocation.startsWith('/projects/')) {
          return route.path === '/projects';
        }
        return route.path === prevLocation;
      });
      
      const currentIndex = ROUTES.findIndex(route => {
        if (location.startsWith('/projects/')) {
          return route.path === '/projects';
        }
        return route.path === location;
      });
      
      if (prevIndex !== -1 && currentIndex !== -1) {
        setDirection(currentIndex > prevIndex ? 1 : -1);
      }
      
      setPrevLocation(location);
    }
  }, [location, prevLocation]);
  
  // Animation variants
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Nav />
      <main className="flex-1 relative">
        <SwipeIndicators />
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={location}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full absolute"
          >
            <Switch location={location}>
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/projects/:id" component={Project} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
