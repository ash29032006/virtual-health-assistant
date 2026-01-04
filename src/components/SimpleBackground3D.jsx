import { Canvas } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";

function SimpleBackground3D() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: "linear-gradient(135deg, #f0f4ff 0%, #fff1f2 100%)",
      }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Sphere args={[1, 16, 16]} position={[-3, 0, -5]}>
          <meshStandardMaterial color="#6366f1" wireframe />
        </Sphere>
        <Sphere args={[1, 16, 16]} position={[3, 0, -5]}>
          <meshStandardMaterial color="#ec4899" wireframe />
        </Sphere>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}

export default SimpleBackground3D;
