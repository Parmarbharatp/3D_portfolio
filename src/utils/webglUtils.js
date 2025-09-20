// WebGL utility functions for better performance and error handling

export const createWebGLContext = (canvas) => {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: true,
    stencil: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false
  }) || canvas.getContext('experimental-webgl', {
    antialias: false,
    alpha: false,
    depth: true,
    stencil: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
    preserveDrawingBuffer: false
  });

  if (!gl) {
    throw new Error('WebGL not supported');
  }

  return gl;
};

export const checkWebGLSupport = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = createWebGLContext(canvas);
    
    // Check for basic WebGL capabilities
    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    
    return {
      supported: true,
      maxTextureSize,
      maxViewportDims,
      vendor: gl.getParameter(gl.VENDOR),
      renderer: gl.getParameter(gl.RENDERER)
    };
  } catch (error) {
    return {
      supported: false,
      error: error.message
    };
  }
};

export const optimizeWebGLSettings = (gl) => {
  if (!gl) return;

  // Optimize for performance
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  
  // Disable features we don't need
  gl.disable(gl.BLEND);
  gl.disable(gl.STENCIL_TEST);
  gl.disable(gl.DITHER);
  
  // Set clear color to transparent
  gl.clearColor(0, 0, 0, 0);
  
  // Optimize texture settings
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
};

export const handleWebGLError = (gl, error) => {
  console.warn('WebGL Error:', error);
  
  // Try to recover from context loss
  if (error.name === 'CONTEXT_LOST_WEBGL') {
    console.log('WebGL context lost, attempting recovery...');
    return 'CONTEXT_LOST';
  }
  
  return 'ERROR';
};

export const createTextureFromImage = (gl, image) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  // Set texture parameters for better performance
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  
  return texture;
};

export const disposeWebGLResources = (gl, resources) => {
  if (!gl) return;
  
  // Dispose textures
  if (resources.textures) {
    resources.textures.forEach(texture => {
      gl.deleteTexture(texture);
    });
  }
  
  // Dispose buffers
  if (resources.buffers) {
    resources.buffers.forEach(buffer => {
      gl.deleteBuffer(buffer);
    });
  }
  
  // Dispose programs
  if (resources.programs) {
    resources.programs.forEach(program => {
      gl.deleteProgram(program);
    });
  }
};

export const getOptimalCanvasSize = (containerWidth, containerHeight, devicePixelRatio = 1) => {
  const maxSize = 1024; // Limit canvas size for performance
  
  let width = containerWidth * devicePixelRatio;
  let height = containerHeight * devicePixelRatio;
  
  // Limit size for performance
  if (width > maxSize) {
    height = (height * maxSize) / width;
    width = maxSize;
  }
  
  if (height > maxSize) {
    width = (width * maxSize) / height;
    height = maxSize;
  }
  
  return { width: Math.floor(width), height: Math.floor(height) };
};
