import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [modelFailed, setModelFailed] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Enhanced mobile detection
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Check for mobile user agents
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isMobileScreen = mediaQuery.matches;
      
      setIsMobile(isMobileUA || isMobileScreen);
      
      console.log('Mobile detection:', {
        userAgent: userAgent,
        isMobileUA,
        isMobileScreen,
        finalResult: isMobileUA || isMobileScreen
      });
    };

    checkMobile();

    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Check if WebGL is supported
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
          setWebglSupported(false);
          setModelFailed(true);
          return;
        }

        // Additional mobile WebGL checks
        if (isMobile) {
          // Check for common mobile WebGL issues
          const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
          if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            console.log('WebGL Renderer:', renderer);
          }

          // Check if device is low-end
          const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
          
          if (maxTextureSize < 2048 || maxViewportDims[0] < 1024) {
            console.log('Low-end device detected, using fallback');
            setModelFailed(true);
          }
        }
      } catch (error) {
        console.error('WebGL check failed:', error);
        setWebglSupported(false);
        setModelFailed(true);
      }
    };

    checkWebGL();

    // Set a timeout for mobile devices to show fallback if 3D doesn't load
    if (isMobile) {
      const timeout = setTimeout(() => {
        console.log('Mobile timeout reached, showing fallback');
        setModelFailed(true);
      }, 8000); // 8 seconds timeout for mobile

      return () => {
        clearTimeout(timeout);
        mediaQuery.removeEventListener("change", handleMediaQueryChange);
      };
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, [isMobile]);

  // Mobile fallback component
  const MobileFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-[#915EFF] to-[#804dee] rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <span className="text-white text-4xl font-bold">BP</span>
        </div>
        <h2 className="text-white text-2xl font-bold mb-4">Bharat Parmar</h2>
        <p className="text-gray-300 text-lg mb-6">Full Stack Developer</p>
        <div className="flex justify-center space-x-4">
          <div className="w-3 h-3 bg-[#915EFF] rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-[#915EFF] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
          <div className="w-3 h-3 bg-[#915EFF] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
        </div>
        <p className="text-gray-400 text-sm mt-4">
          {!webglSupported ? '3D rendering not supported on this device' : 'Loading optimized view...'}
        </p>
      </div>
    </div>
  );

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Bharat Parmar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
          turning ideas into code <br className='sm:block hidden' />
         
          </p>
        </div>
      </div>

      {modelFailed || (isMobile && !webglSupported) ? (
        <MobileFallback />
      ) : (
        <ComputersCanvas />
      )}

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
