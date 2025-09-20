import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-1 h-40 sm:h-80 md:h-96 lg:h-[400px] violet-gradient' />
        </div>

        <div className='flex-1'>
          <h1 className={`${styles.heroHeadText} text-white leading-tight`}>
            Hi, I'm <span className='text-[#915EFF]'>Bharat Parmar</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            turning ideas into code <br className='sm:block hidden' />
          </p>
        </div>
      </div>

      {/* Optimized 3D computer model for all screen sizes */}
      <div className='absolute inset-0 z-0'>
        <ComputersCanvas />
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-20'>
        <a href='#about' className='hover:scale-110 transition-transform duration-300'>
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
