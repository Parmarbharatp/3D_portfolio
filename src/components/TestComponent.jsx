import React from "react";

const TestComponent = () => {
  return (
    <div className="w-full min-h-screen bg-primary flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-4">React is Working!</h1>
        <p className="text-gray-300 text-lg">If you can see this, the basic React app is functioning.</p>
        <div className="mt-8 p-4 bg-[#915EFF] rounded-lg">
          <p className="text-white">Current time: {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
