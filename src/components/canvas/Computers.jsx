import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Lightweight 3D computer for mobile
const SimpleComputer = ({ isMobile }) => {
  return (
    <group>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={1} />
      
      {/* Simple computer representation */}
      <mesh position={[0, -2, 0]} castShadow receiveShadow>
        {/* Monitor */}
        <boxGeometry args={[2, 1.2, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Monitor Stand */}
      <mesh position={[0, -2.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.6, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Base */}
      <mesh position={[0, -3.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, -2, 0.06]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1, 0.01]} />
        <meshStandardMaterial color="#915EFF" emissive="#915EFF" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
};

const Computers = ({ isMobile, useSimpleModel = false }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  
  const computer = useGLTF("./desktop_pc/scene.gltf");

  useEffect(() => {
    if (computer) {
      setModelLoaded(true);
    }
  }, [computer]);

  // Use simple model for mobile or if there's an error
  if (useSimpleModel || modelError) {
    return <SimpleComputer isMobile={isMobile} />;
  }

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={isMobile ? 512 : 1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [useSimpleModel, setUseSimpleModel] = useState(false);
  const maxLoadAttempts = 3;

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Check device capabilities and decide on model type
  useEffect(() => {
    const checkDeviceCapabilities = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) {
          setUseSimpleModel(true);
          return;
        }

        // Check for mobile-specific limitations
        if (isMobile) {
          const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
          const maxViewportDims = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
          const memoryInfo = gl.getExtension('WEBGL_debug_renderer_info');
          
          // Use simple model for low-end devices
          if (maxTextureSize < 2048 || maxViewportDims[0] < 1024) {
            console.log('Low-end mobile device detected, using simple model');
            setUseSimpleModel(true);
            return;
          }

          // Check for known problematic mobile GPUs
          if (memoryInfo) {
            const renderer = gl.getParameter(memoryInfo.UNMASKED_RENDERER_WEBGL);
            const vendor = gl.getParameter(memoryInfo.UNMASKED_VENDOR_WEBGL);
            
            // Use simple model for known problematic mobile GPUs
            const problematicGPUs = [
              'Mali-G51', 'Mali-G52', 'Mali-G31', 'Mali-G71', 'Mali-G72',
              'PowerVR', 'Adreno 505', 'Adreno 506', 'Adreno 510'
            ];
            
            if (problematicGPUs.some(gpu => renderer.includes(gpu))) {
              console.log('Problematic mobile GPU detected, using simple model');
              setUseSimpleModel(true);
              return;
            }
          }
        }
      } catch (error) {
        console.warn('Device capability check failed:', error);
        setUseSimpleModel(true);
      }
    };

    checkDeviceCapabilities();
  }, [isMobile]);

  // Preload the model with retry logic
  useEffect(() => {
    if (useSimpleModel) return; // Don't preload if using simple model

    const preloadModel = async () => {
      try {
        await useGLTF.preload("./desktop_pc/scene.gltf");
      } catch (error) {
        console.warn("Failed to preload 3D model:", error);
        if (loadAttempts < maxLoadAttempts) {
          setTimeout(() => {
            setLoadAttempts(prev => prev + 1);
            preloadModel();
          }, 2000);
        } else {
          setUseSimpleModel(true);
        }
      }
    };

    preloadModel();
  }, [loadAttempts, useSimpleModel]);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: !isMobile,
        alpha: false,
        failIfMajorPerformanceCaveat: false
      }}
      onCreated={() => setIsLoading(false)}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={!isMobile}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <Computers isMobile={isMobile} useSimpleModel={useSimpleModel} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
