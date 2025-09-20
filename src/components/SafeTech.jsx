import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const SafeTech = () => {
  return (
    <div className="relative z-0">
      <div className="max-w-7xl mx-auto sm:px-16 px-6">
        <span className="hash-span" id="tech">
          &nbsp;
        </span>
        
        <div>
          <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
            What I have worked with
          </p>
          <h2 className="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
            Technologies.
          </h2>
        </div>

        <div className="w-full flex">
          <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
            I've worked with a range of technologies in the web development world.
            From Back-end To Design.
          </p>
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-10 mt-20">
          {technologies.map((technology) => (
            <div 
              key={technology.name}
              className="w-28 h-28 flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 rounded-full hover:scale-110 transition-transform duration-300 cursor-pointer group border border-gray-600"
            >
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-2 group-hover:bg-gray-800 transition-colors">
                <span className="text-gray-300 text-lg font-bold">
                  {technology.name.charAt(0)}
                </span>
              </div>
              <span className="text-gray-300 text-xs font-medium text-center px-1">
                {technology.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(SafeTech, "");
