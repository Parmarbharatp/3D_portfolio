import React, { useState, useEffect } from 'react';
import { checkWebGLSupport } from '../utils/webglUtils';
import { isMobile, isLowEndDevice, getConnectionInfo } from '../utils/mobileUtils';

const PerformanceMonitor = () => {
  const [performanceInfo, setPerformanceInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const gatherInfo = () => {
      const webglInfo = checkWebGLSupport();
      const connectionInfo = getConnectionInfo();
      
      setPerformanceInfo({
        webgl: webglInfo,
        mobile: isMobile(),
        lowEnd: isLowEndDevice(),
        connection: connectionInfo,
        memory: navigator.deviceMemory || 'Unknown',
        cores: navigator.hardwareConcurrency || 'Unknown',
        userAgent: navigator.userAgent.substring(0, 50) + '...',
        timestamp: new Date().toLocaleTimeString()
      });
    };

    gatherInfo();
    const interval = setInterval(gatherInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Only show in development mode
  if (import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-[#915EFF] text-white px-3 py-1 rounded text-xs font-bold"
      >
        {isVisible ? 'Hide' : 'Show'} Debug
      </button>
      
      {isVisible && (
        <div className="mt-2 bg-black bg-opacity-90 text-white p-3 rounded text-xs max-w-xs">
          <div className="font-bold mb-2">Performance Info:</div>
          <div className="space-y-1">
            <div>WebGL: {performanceInfo.webgl?.supported ? '✅' : '❌'}</div>
            <div>Mobile: {performanceInfo.mobile ? '✅' : '❌'}</div>
            <div>Low End: {performanceInfo.lowEnd ? '✅' : '❌'}</div>
            <div>Memory: {performanceInfo.memory}GB</div>
            <div>Cores: {performanceInfo.cores}</div>
            <div>Connection: {performanceInfo.connection?.effectiveType || 'Unknown'}</div>
            <div className="text-gray-400 text-xs mt-2">
              Last update: {performanceInfo.timestamp}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
