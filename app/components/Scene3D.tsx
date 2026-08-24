"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Image as DreiImage, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#eab308";

// Same photos used in the "Our Three Pillars" section, reused here so the
// hero/auth backdrops stay visually consistent with the rest of the site.
const CULTURE_PHOTOS = [
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop",
];

function PhotoCard({
  url,
  position,
  rotation = [0, 0, 0],
  size = [2, 2.4],
  floatSpeed = 1.2,
}: {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  size?: [number, number];
  floatSpeed?: number;
}) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={1.6}>
      <group position={position} rotation={rotation}>
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[size[0] + 0.18, size[1] + 0.18]} />
          <meshStandardMaterial
            color={GOLD}
            metalness={0.5}
            roughness={0.3}
            emissive={GOLD}
            emissiveIntensity={0.15}
          />
        </mesh>
        <DreiImage url={url} scale={size} radius={0.08} transparent />
      </group>
    </Float>
  );
}

function FloatingCluster({ variant }: { variant: "hero" | "auth" }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.3, 0.03);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.15, 0.03);
  });

  const photos = variant === "hero" ? CULTURE_PHOTOS : CULTURE_PHOTOS.slice(0, 2);

  return (
    <group ref={group}>
      <PhotoCard
        url={photos[0]}
        position={[-2.6, 0.4, -0.5]}
        rotation={[0, 0.25, -0.08]}
        size={[2.1, 2.6]}
        floatSpeed={1.1}
      />
      {photos[1] && (
        <PhotoCard
          url={photos[1]}
          position={[2.5, -0.5, -1.2]}
          rotation={[0, -0.3, 0.06]}
          size={[2, 2.5]}
          floatSpeed={1.4}
        />
      )}
      {photos[2] && (
        <PhotoCard
          url={photos[2]}
          position={[0.2, 1.9, -2.4]}
          rotation={[0, 0.1, -0.04]}
          size={[1.6, 2]}
          floatSpeed={0.9}
        />
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
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#fde68a" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#f59e0b" />
        <Suspense fallback={null}>
          <FloatingCluster variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
