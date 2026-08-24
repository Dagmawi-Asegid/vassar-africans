"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#eab308";
const AMBER = "#f59e0b";
const HONEY = "#fbbf24";

function FloatingCluster({ variant }: { variant: "hero" | "auth" }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.4, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.2, 0.03);
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={1.1} floatIntensity={1.8}>
        <mesh position={[-2.4, 0.6, 0]}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial color={GOLD} metalness={0.6} roughness={0.25} flatShading />
        </mesh>
      </Float>

      <Float speed={1.1} rotationIntensity={1.4} floatIntensity={2.2}>
        <mesh position={[2.2, -0.4, -1]}>
          <torusKnotGeometry args={[0.8, 0.26, 128, 32]} />
          <meshStandardMaterial color={AMBER} metalness={0.4} roughness={0.3} />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[0.3, 1.6, -2]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color={HONEY} metalness={0.5} roughness={0.2} flatShading />
        </mesh>
      </Float>

      {variant === "hero" && (
        <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[-1, -1.6, -1.5]} rotation={[0.4, 0.2, 0]}>
            <torusGeometry args={[1.4, 0.04, 16, 100]} />
            <meshStandardMaterial
              color={GOLD}
              emissive={GOLD}
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        </Float>
      )}

      <Sparkles
        count={variant === "hero" ? 120 : 60}
        scale={[8, 6, 6]}
        size={2}
        speed={0.3}
        color={GOLD}
        opacity={0.6}
      />
    </group>
  );
}

export default function Scene3D({
  variant = "hero",
  className = "",
}: {
  variant?: "hero" | "auth";
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fde68a" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#f59e0b" />
        <Suspense fallback={null}>
          <FloatingCluster variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
