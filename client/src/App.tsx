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
import SwipeIndicators from "@/components/SwipeIndicators";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSwipeNavigation } from "@/hooks/swipenavigation"; 
import "@/swipe-navigation.css";
import IntroCrawl from "@/components/IntroCrawl";

const ANIMATION_ROUTES = [
  { path: '/', order: 0, name: 'Home' },
  { path: '/projects', order: 1, name: 'Projects' },
  { path: '/contact', order: 2, name: 'Contact' },
];

function Router() {
  const [location] = useLocation(); // Current location from wouter
  const [direction, setDirection] = useState(0); // Animation direction: 1 for next, -1 for prev
  const [prevLocation, setPrevLocation] = useState(location);
  useSwipeNavigation();

  useEffect(() => {
    if (location !== prevLocation) {
      const getRouteInfo = (loc: string) => {
        if (loc.startsWith('/projects/')) {
          // Treat project detail pages as belonging to the "Projects" section for animation order
          return ANIMATION_ROUTES.find(route => route.path === '/projects');
        }
        return ANIMATION_ROUTES.find(route => route.path === loc);
      };

      const prevRouteInfo = getRouteInfo(prevLocation);
      const currentRouteInfo = getRouteInfo(location);

      let newDirection = 0;

      if (prevRouteInfo && currentRouteInfo) {
        if (currentRouteInfo.order > prevRouteInfo.order) {
          newDirection = 1; // Navigating to a "later" page
        } else if (currentRouteInfo.order < prevRouteInfo.order) {
          newDirection = -1; // Navigating to an "earlier" page
        } else {
          if (location.startsWith('/projects/') && prevLocation === '/projects') {
            newDirection = 1; // "Drill down" into a project, animate as if going "next"
          } else if (location === '/projects' && prevLocation.startsWith('/projects/')) {
            newDirection = -1; // "Drill up" from a project, animate as if going "previous"
          } else {
            newDirection = 0; // Or 1, or handle with a specific animation variant
          }
        }
      } else if (currentRouteInfo) {
        // Navigating from an unknown/initial route to a known one 
        newDirection = 1; // Default to animate in from the right
      }
      setDirection(newDirection);
      setPrevLocation(location);
    }
  }, [location, prevLocation]);

  // Animation variants for page transitions
  const pageVariants = {
    initial: (customDirection: number) => ({
      x: customDirection === 0 ? "0%" : customDirection > 0 ? "100%" : "-100%",
      opacity: 0,
      position: 'absolute' as 'absolute',
      width: '100%',
      height: '100%',
    }),
    animate: {
      x: "0%",
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2, delay: 0.05 }, // Slight delay for opacity for smoother feel
      },
    },
    exit: (customDirection: number) => ({
      x: customDirection === 0 ? "0%" : customDirection < 0 ? "100%" : "-100%", // Note: exit direction is opposite of entry
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Specific variant for NotFound page 
  const notFoundVariants = {
    initial: { opacity: 0, position: 'absolute' as 'absolute', width: '100%', height: '100%' },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };


  return (
    // This root div sets up the overall screen layout
    <div className="min-h-screen flex flex-col bg-background text-foreground"> {/* Added bg/text for theming */}
      <Nav />
      {/* Main content area where pages are rendered and animated */}
      {/* flex-1 makes it take up remaining vertical space */}
      {/* relative is for positioning the absolutely positioned motion.divs */}
      {/* overflow-x-hidden contains horizontal animations */}
      <main className="flex-1 relative overflow-x-hidden">
        <SwipeIndicators />
        {/* AnimatePresence handles enter/exit animations of its direct children */}
        {/* mode="wait" ensures the exiting component finishes its animation before the new one enters */}
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          {/* We use a nested Switch to apply animations to the "page" concept, not individual routes */}
          {/* The key for motion.div is crucial for AnimatePresence to detect changes.
              Using location.split("/").slice(0, location.startsWith("/projects/") ? 2 : 3).join("/")
              can group /projects and /projects/:id to animate as one "page concept" if desired,
              or simply use `location` if each distinct path should trigger a full re-animation.
              For swipe, `location` is usually fine, but consider how project detail views enter/exit.
              If `/projects/:id` should feel like part of `/projects`, a common key prefix is needed.
              Let's use a slightly more robust key for grouping project pages.
          */}
          <motion.div
            key={location.startsWith("/projects/") ? "/projects" : location} // Key for page-level animation
            custom={direction}
            variants={location === "/404" || location.startsWith("/not-found") ? notFoundVariants : pageVariants} // Use different variants for NotFound
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full absolute top-0 left-0 overflow-y-auto" // Ensures it fills main and enables scrolling
          >
            <Switch location={location}> {/* Inner Switch for routing */}
              <Route path="/" component={Home} />
              <Route path="/projects" component={Projects} />
              <Route path="/projects/:id" component={Project} /> {/* :id will be a param */}
              <Route path="/contact" component={Contact} />
              {/* Default catch-all route for 404 Not Found pages */}
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  const [showIntro, setShowIntro] = useState(true);
    const handleIntroFinished = () => {
    console.log("App.tsx - handleIntroFinished called");
    setShowIntro(false);
  };

  console.log("App.tsx render - showIntro state is:", showIntro);

  if (showIntro) {
    console.log("App.tsx render - Rendering IntroCrawl");
    return <IntroCrawl onFinished={handleIntroFinished} />;
  }

  console.log("App.tsx render - Rendering Main App");
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;