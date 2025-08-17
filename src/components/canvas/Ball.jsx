import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from "../Loader";

const Ball = (props) => {
  const [isMobile, setIsMobile] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [textureError, setTextureError] = useState(false);
  const [decal, setDecal] = useState(null);
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIsMobile(mediaQuery.matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load texture manually for better mobile compatibility
  useEffect(() => {
    const loadTexture = async () => {
      console.log(`🎯 Attempting to load texture: ${props.imgUrl}`);
      try {
        const textureLoader = new THREE.TextureLoader();
        const texture = await new Promise((resolve, reject) => {
          textureLoader.load(
            props.imgUrl,
            (texture) => {
              console.log(`✅ Texture loaded successfully: ${props.imgUrl}`);
              texture.encoding = THREE.sRGBEncoding;
              resolve(texture);
            },
            undefined,
            (error) => {
              console.warn(`❌ Failed to load texture: ${props.imgUrl}`, error);
              reject(error);
            }
          );
        });
        
        setDecal(texture);
        setTextureLoaded(true);
        setTextureError(false);
        console.log(`🎉 Texture state updated for: ${props.imgUrl}`);
      } catch (error) {
        console.warn(`💥 Texture loading failed for: ${props.imgUrl}`, error);
        setTextureError(true);
        setTextureLoaded(false);
      }
    };

    if (props.imgUrl) {
      loadTexture();
    }
  }, [props.imgUrl]);

  // If texture failed to load, show a colored ball instead
  if (textureError || !textureLoaded) {
    console.log(`🟣 Showing fallback ball for: ${props.imgUrl}`);
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

  console.log(`🟢 Rendering ball with texture for: ${props.imgUrl}`);
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
        {decal && (
          <Decal
            position={[0, 0, 1]}
            rotation={[2 * Math.PI, 0, 6.25]}
            scale={1}
            map={decal}
            flatShading
          />
        )}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mediaQuery = window.matchMedia("(max-width: 500px)");
      setIsMobile(mediaQuery.matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log(`🎨 BallCanvas rendering with icon: ${icon}`);

  return (
    <Canvas
      frameloop='demand'
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ 
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        antialias: !isMobile,
        alpha: false,
        failIfMajorPerformanceCaveat: false
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls 
          enableZoom={false}
          enablePan={!isMobile}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
