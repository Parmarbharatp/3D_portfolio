import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  
  // Use useGLTF hook properly without conditional calls
  const computer = useGLTF("./desktop_pc/scene.gltf");

  useEffect(() => {
    if (computer && computer.scene) {
      setModelLoaded(true);
      setModelError(false);
    } else {
      setModelError(true);
    }
  }, [computer]);

  // Error handling for model loading - show a simple colored box
  if (modelError || !modelLoaded) {
    return (
      <mesh>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#915EFF" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
      </mesh>
    );
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
      {computer && computer.scene && (
        <primitive
          object={computer.scene}
          scale={isMobile ? 0.7 : 0.75}
          position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
          rotation={[-0.01, -0.2, -0.1]}
        />
      )}
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
