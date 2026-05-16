/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, color, speed, distort, theme }: {
  position: [number, number, number];
  color: string;
  speed: number;
  distort: number;
  theme?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      mesh.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={mesh} position={position}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={theme === 'light' ? 0.3 : 0.2}
          metalness={theme === 'light' ? 0.1 : 0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={theme === 'light' ? 0.9 : 0.7}
        />
      </mesh>
    </Float>
  );
}

function DataSphere({ theme }: { theme?: string }) {
  const points = useRef<THREE.Points>(null);
  const count = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.2 + Math.random() * 0.3;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.08;
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6c63ff" transparent opacity={theme === 'light' ? 0.8 : 0.6} sizeAttenuation />
    </points>
  );
}

export default function Scene3D({ theme = 'dark' }: { theme?: string }) {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={theme === 'light' ? 1.5 : 0.3} />
        <directionalLight position={[5, 5, 5]} intensity={theme === 'light' ? 1.5 : 0.8} color="#6c63ff" />
        <directionalLight position={[-5, -5, 5]} intensity={theme === 'light' ? 1 : 0.4} color="#00d4aa" />
        <pointLight position={[0, 0, 3]} intensity={theme === 'light' ? 1 : 0.5} color="#ff6b9d" />
        <FloatingShape position={[-1.5, 0.5, 0]} color="#6c63ff" speed={1.2} distort={0.4} theme={theme} />
        <FloatingShape position={[1.8, -0.3, -1]} color="#00d4aa" speed={0.8} distort={0.3} theme={theme} />
        <FloatingShape position={[0.2, 1.5, -0.5]} color="#ff6b9d" speed={1} distort={0.5} theme={theme} />
        <DataSphere theme={theme} />
      </Canvas>
    </div>
  );
}
