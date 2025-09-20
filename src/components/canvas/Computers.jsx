import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobileDevice, isTablet, isLargeScreen }) => {      
  const computer = useGLTF("/desktop_pc/scene.gltf");
  
  // Optimize scale and position based on screen size
  const getScale = () => {
    if (isMobileDevice) return 0.7;
    if (isTablet) return 1.0;
    if (isLargeScreen) return 1.4;
    return 1.2;
  };

  const getPosition = () => {
    if (isMobileDevice) return [0, -2.5, -1.5];
    if (isTablet) return [0, -3.0, -1.5];
    if (isLargeScreen) return [0, -3.5, -1.5];
    return [0, -3.25, -1.5];
  };
  
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={isMobileDevice ? 0.5 : 1}
        castShadow
        shadow-mapSize={isMobileDevice ? 128 : 256}
      />
      <pointLight intensity={isMobileDevice ? 0.5 : 1} />
      <primitive
        object={computer.scene}
        scale={getScale()}
        position={getPosition()}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobileDevice(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsLargeScreen(width > 1440);
    };

    checkDevice();
    
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows={!isMobileDevice}
      dpr={isMobileDevice ? [1, 1] : [1, 1.2]}
      camera={{ 
        position: isMobileDevice ? [20, 3, 5] : [25, 3, 5], 
        fov: isMobileDevice ? 25 : 20 
      }}
      gl={{ 
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
        antialias: !isMobileDevice,
        alpha: false,
        failIfMajorPerformanceCaveat: false,
        stencil: false,
        depth: true
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
        gl.toneMapping = 0;
        gl.outputEncoding = 3001;
        setIsLoading(false);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={!isMobileDevice}
          autoRotateSpeed={0.5}
        />
        <Computers 
          isMobileDevice={isMobileDevice} 
          isTablet={isTablet} 
          isLargeScreen={isLargeScreen} 
        />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
