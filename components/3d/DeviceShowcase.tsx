'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { Group } from 'three';
import { cn, prefersReducedMotion } from '@/lib/utils';

// Simple 3D Tonometer representation (placeholder for actual model)
function TonometerModel() {
  const meshRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const shouldAnimate = !prefersReducedMotion();

  // Idle rotation animation
  useFrame((state) => {
    if (meshRef.current && shouldAnimate && !hovered) {
      // Medical device idle animation - subtle and professional
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x = 0.1 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
  });

  return (
    <group
      ref={meshRef}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Main device body */}
      <Box args={[1.5, 0.8, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color={hovered ? "#00E5FF" : "#00D4E6"} 
          metalness={0.7}
          roughness={0.2}
        />
      </Box>
      
      {/* Measurement probe */}
      <Box args={[0.2, 0.2, 1]} position={[0.5, 0, 0.8]}>
        <meshStandardMaterial 
          color="#0066CC" 
          metalness={0.8}
          roughness={0.1}
        />
      </Box>
      
      {/* Display screen */}
      <Box args={[0.6, 0.4, 0.05]} position={[0, 0.2, 0.35]}>
        <meshStandardMaterial 
          color="#1A202C" 
          emissive={hovered ? "#3DFDFE" : "#00D4E6"}
          emissiveIntensity={0.3}
        />
      </Box>
      
      {/* Control buttons */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <Box key={i} args={[0.15, 0.08, 0.08]} position={[x, -0.3, 0.3]}>
          <meshStandardMaterial 
            color="#4A5568" 
            metalness={0.5}
            roughness={0.3}
          />
        </Box>
      ))}

      {/* Hover information */}
      {hovered && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="#00D4E6"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          At-Home Tonometer
        </Text>
      )}
    </group>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-full border-4 border-gray-200 animate-spin"
          style={{
            borderTopColor: 'var(--color-medical-teal)',
            animation: 'spin 1s linear infinite'
          }}
        />
        <span className="sr-only">Loading 3D medical device model</span>
      </div>
    </div>
  );
}

// Static fallback for reduced motion users
function StaticFallback() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div 
        className="w-32 h-32 rounded-xl flex items-center justify-center mb-4"
        style={{ 
          background: 'linear-gradient(135deg, var(--color-medical-teal), var(--color-ai-cyan))',
          transform: 'perspective(1000px) rotateY(15deg) rotateX(10deg)'
        }}
      >
        <div className="w-20 h-12 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">At-Home Tonometer</h3>
      <p className="text-gray-600 text-sm mt-1">Interactive 3D medical device</p>
    </div>
  );
}

interface DeviceShowcaseProps {
  className?: string;
  autoRotate?: boolean;
  showControls?: boolean;
}

export function DeviceShowcase({ 
  className,
  autoRotate = true,
  showControls = true 
}: DeviceShowcaseProps) {
  const shouldAnimate = !prefersReducedMotion();

  // Return static version for reduced motion users
  if (!shouldAnimate) {
    return (
      <div className={cn('device-showcase', className)} role="img" aria-label="3D model of at-home tonometer medical device">
        <StaticFallback />
      </div>
    );
  }

  return (
    <div 
      className={cn('device-showcase perspective-1000', className)}
      role="img" 
      aria-label="Interactive 3D model of at-home tonometer medical device. Click and drag to rotate, scroll to zoom."
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [3, 2, 5], fov: 50 }}
          style={{ background: 'transparent' }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          {/* Lighting setup for medical device */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight 
            position={[-5, 5, 5]} 
            intensity={0.3} 
            color="#3DFDFE" 
          />

          {/* 3D Model */}
          <TonometerModel />

          {/* Controls */}
          {showControls && (
            <OrbitControls 
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              enableZoom={true}
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Canvas>
      </Suspense>

      {/* Accessibility instructions */}
      <div className="sr-only" aria-live="polite">
        Interactive 3D model of medical tonometer device. Use mouse or touch to rotate and zoom. 
        This device is used for at-home glaucoma screening and pressure measurement.
      </div>
    </div>
  );
}