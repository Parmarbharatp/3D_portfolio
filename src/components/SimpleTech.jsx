import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const SimpleTech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div 
          key={technology.name}
          className='w-28 h-28 flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 rounded-full hover:scale-110 transition-transform duration-300 border border-gray-600'
        >
          <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-2">
            <span className="text-gray-300 text-xs font-bold">{technology.name.charAt(0)}</span>
          </div>
          <span className="text-gray-300 text-xs font-medium text-center px-1">{technology.name}</span>
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(SimpleTech, "");
