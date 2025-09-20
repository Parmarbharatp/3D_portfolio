import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [decal, setDecal] = useState(null);
  const [error, setError] = useState(false);

  // Load texture with error handling
  useEffect(() => {
    if (!props.imgUrl) {
      setError(true);
      return;
    }

    const loadTexture = async () => {
      try {
        const texture = await new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas);
          };
          img.onerror = reject;
          img.src = props.imgUrl;
        });
        setDecal(texture);
        setError(false);
      } catch (err) {
        console.warn('Failed to load texture:', props.imgUrl, err);
        setError(true);
      }
    };

    loadTexture();
  }, [props.imgUrl]);

  // Fallback to simple sphere if texture fails
  if (error || !decal) {
    return (
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, 0.05]} />
        <mesh castShadow receiveShadow scale={2.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color='#915EFF'
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
        </mesh>
      </Float>
    );
  }

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [webglError, setWebglError] = useState(false);

  // Handle WebGL context loss
  useEffect(() => {
    const handleContextLost = () => {
      console.warn('WebGL context lost, recreating canvas...');
      setWebglError(true);
      setTimeout(() => {
        setCanvasKey(prev => prev + 1);
        setWebglError(false);
      }, 100);
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
    }
  }, []);

  // Fallback for WebGL errors
  if (webglError) {
    return (
      <div className="w-28 h-28 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600">
        <span className="text-gray-300 text-xs font-bold">3D</span>
      </div>
    );
  }

  return (
    <Canvas
      key={canvasKey}
      frameloop='demand'
      dpr={[1, 1.5]}
      gl={{ 
        preserveDrawingBuffer: true,
        antialias: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
        alpha: false,
        depth: true,
        stencil: false
      }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
        gl.toneMapping = 0;
        gl.outputEncoding = 3001; // sRGBEncoding
      }}
      onError={(error) => {
        console.error('Canvas error:', error);
        setWebglError(true);
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={4}
        />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
