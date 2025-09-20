// Mobile utility functions for better performance and user experience

export const isMobile = () => {
  return window.innerWidth <= 768;
};

export const isLowEndDevice = () => {
  const memory = navigator.deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const connection = navigator.connection;
  
  // Check for slow connection
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    connection.effectiveType === '3g'
  );
  
  return memory < 4 || cores < 4 || isSlowConnection;
};

export const supportsWebGL = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  return !!gl;
};

export const getOptimalDPR = () => {
  if (isMobile()) {
    return isLowEndDevice() ? 1 : 1.2;
  }
  return Math.min(window.devicePixelRatio, 2);
};

export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, i)));
    }
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const getConnectionInfo = () => {
  const connection = navigator.connection;
  if (!connection) return { type: 'unknown', effectiveType: 'unknown' };
  
  return {
    type: connection.type,
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt
  };
};

export const shouldReduceMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const getBatteryInfo = async () => {
  if ('getBattery' in navigator) {
    try {
      const battery = await navigator.getBattery();
      return {
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    } catch (error) {
      console.warn('Battery API not available:', error);
      return null;
    }
  }
  return null;
};

export const optimizeForMobile = () => {
  const optimizations = {
    reducedMotion: shouldReduceMotion(),
    lowEndDevice: isLowEndDevice(),
    mobile: isMobile(),
    webglSupported: supportsWebGL(),
    connectionInfo: getConnectionInfo()
  };
  
  // Apply optimizations based on device capabilities
  if (optimizations.reducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  }
  
  if (optimizations.lowEndDevice) {
    document.documentElement.style.setProperty('--quality', 'low');
  }
  
  return optimizations;
};
