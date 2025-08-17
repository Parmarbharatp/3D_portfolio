import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      setIsMobile(mediaQuery.matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Register service worker for better caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.warn('Service Worker registration failed:', error);
        });
    }

    // Preload critical assets for mobile (non-blocking)
    if (isMobile) {
      const preloadCriticalAssets = async () => {
        try {
          // Preload tech images that commonly fail on mobile
          const techImages = [
            '/src/assets/tech/html.png',
            '/src/assets/tech/css.png',
            '/src/assets/tech/javascript.png',
            '/src/assets/tech/typescript.png'
          ];

          const preloadPromises = techImages.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => resolve(src);
              img.onerror = () => resolve(src); // Continue even if some fail
              img.src = src;
            });
          });

          await Promise.all(preloadPromises);
          console.log('Critical tech images preloaded for mobile');
        } catch (error) {
          console.warn('Some critical assets failed to preload:', error);
        }
      };

      // Don't block the app loading for preloading
      preloadCriticalAssets().catch(error => {
        console.warn('Preloading failed but continuing:', error);
      });
    }

    // Remove artificial loading delay - show app immediately
    setIsLoading(false);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Error boundary for the entire app
  useEffect(() => {
    const handleError = (error) => {
      console.error('App error caught:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="w-full h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#915EFF] to-[#804dee] rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">BP</span>
          </div>
          <p className="text-white text-lg mb-4">Something went wrong</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#915EFF] text-white px-4 py-2 rounded-lg hover:bg-[#804dee]"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#915EFF] to-[#804dee] rounded-full flex items-center justify-center mb-4 animate-pulse">
            <span className="text-white text-2xl font-bold">BP</span>
          </div>
          <p className="text-white text-lg">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <Contact />
          {!isMobile && <StarsCanvas />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
