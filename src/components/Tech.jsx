import React, { useEffect, useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIsMobile(mediaQuery.matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Preload tech images for better mobile performance
    const preloadImages = async () => {
      try {
        const imagePromises = technologies.map((tech) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(tech.icon);
            img.onerror = () => reject(new Error(`Failed to load ${tech.name} image`));
            img.src = tech.icon;
          });
        });

        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.warn("Some tech images failed to preload:", error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
