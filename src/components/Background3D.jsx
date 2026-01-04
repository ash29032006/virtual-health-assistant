import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

function AnimatedSphere({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 32, 32]}
      position={position}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshPhongMaterial color={hovered ? "#ec4899" : "#6366f1"} wireframe />
    </Sphere>
  );
}

export default function Background3D() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        background: "linear-gradient(to bottom right, #f0f4ff, #fff1f2)",
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedSphere position={[-4, 0, -5]} />
      <AnimatedSphere position={[4, 0, -5]} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
