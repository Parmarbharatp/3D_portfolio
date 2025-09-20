import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { isMobile, retryWithBackoff, preloadImage } from "../utils/mobileUtils";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const maxRetries = 3;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(isMobile());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = async () => {
    if (retryCount < maxRetries) {
      try {
        await retryWithBackoff(
          () => preloadImage(`${image}?retry=${retryCount + 1}&t=${Date.now()}`),
          maxRetries - retryCount,
          1000
        );
        setRetryCount(prev => prev + 1);
        handleImageLoad();
      } catch (error) {
        setRetryCount(prev => prev + 1);
        if (retryCount + 1 >= maxRetries) {
          setImageError(true);
          setImageLoaded(true);
        }
      }
    } else {
      setImageError(true);
      setImageLoaded(true);
    }
  };

  const retryImage = async () => {
    setRetryCount(0);
    setImageError(false);
    setImageLoaded(false);
    
    try {
      await preloadImage(`${image}?retry=${Date.now()}`);
      handleImageLoad();
    } catch (error) {
      handleImageError();
    }
  };

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        tiltMaxAngleX={isMobileDevice ? 15 : 45}
        tiltMaxAngleY={isMobileDevice ? 15 : 45}
        scale={1}
        transitionSpeed={450}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          {!imageLoaded && !imageError && (
            <div className="w-full h-full bg-gray-700 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#915EFF] mx-auto mb-2"></div>
                <p className="text-white text-xs">Loading...</p>
                {retryCount > 0 && (
                  <p className="text-gray-400 text-xs mt-1">Retry {retryCount}/{maxRetries}</p>
                )}
              </div>
            </div>
          )}
          
          {imageError ? (
            <div className="w-full h-full bg-gray-700 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-600 rounded-full flex items-center justify-center mb-2">
                  <span className="text-white text-xl font-bold">!</span>
                </div>
                <p className="text-white text-sm mb-2">Image not available</p>
                <button 
                  onClick={retryImage}
                  className="text-[#915EFF] text-xs hover:text-white transition-colors px-3 py-1 rounded border border-[#915EFF]"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <img
              src={image}
              alt={`${name} project`}
              className={`w-full h-full object-cover rounded-2xl cursor-pointer transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => live_demo_link && window.open(live_demo_link, "_blank")}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          )}

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover gap-2'>
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
                className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
                title='Live Demo'
              >
                <svg
                  className='w-1/2 h-1/2 text-white'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414l3 3a2 2 0 012.828 0 2 2 0 002.828-2.828l-3-3a2 2 0 00-2.828 0 1 1 0 00-1.414-1.414l3-3z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            )}
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
              title='Source Code'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
