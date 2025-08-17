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

    // Debug: Log tech data
    console.log("🔍 Tech data:", technologies);
    technologies.forEach((tech, index) => {
      console.log(`Tech ${index + 1}: ${tech.name} - ${tech.icon}`);
    });

    // Preload tech images for better mobile performance
    const preloadImages = async () => {
      try {
        const imagePromises = technologies.map((tech) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              console.log(`✅ Image loaded: ${tech.name} - ${tech.icon}`);
              resolve(tech.icon);
            };
            img.onerror = () => {
              console.error(`❌ Image failed: ${tech.name} - ${tech.icon}`);
              reject(new Error(`Failed to load ${tech.name} image`));
            };
            img.src = tech.icon;
          });
        });

        await Promise.all(imagePromises);
        console.log('🎉 All tech images preloaded successfully');
        setImagesLoaded(true);
      } catch (error) {
        console.warn("⚠️ Some tech images failed to preload:", error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='flex flex-col items-center'>
      {/* Simple image test */}
      <div className='mb-8 p-4 bg-gray-800 rounded-lg'>
        <h3 className='text-white mb-4'>Image Test (First 4 Tech Images):</h3>
        <div className='flex gap-4 flex-wrap justify-center'>
          {technologies.slice(0, 4).map((tech, index) => (
            <div key={tech.name} className='text-center'>
              <img 
                src={tech.icon} 
                alt={tech.name}
                className='w-16 h-16 object-contain bg-white rounded'
                onLoad={() => console.log(`✅ Test image loaded: ${tech.name}`)}
                onError={() => console.error(`❌ Test image failed: ${tech.name}`)}
              />
              <p className='text-white text-xs mt-2'>{tech.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Original 3D balls */}
      <div className='flex flex-row flex-wrap justify-center gap-10'>
        {technologies.map((technology, index) => (
          <div className='w-28 h-28' key={technology.name}>
            <div style={{ fontSize: '10px', color: 'white', textAlign: 'center' }}>
              {index + 1}. {technology.name}
            </div>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
