import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const nodes: [number, number, number][] = [
  [-2.2, 1.2, 0], [-1.8, -1.35, .35], [-.65, 1.75, -.25],
  [.1, .15, .55], [.8, -1.6, -.25], [1.45, 1.2, .2], [2.25, -.55, 0],
];

function Network() {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * .12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * .25) * .08;
  });

  return (
    <group ref={group}>
      {nodes.map((position, index) => (
        <Float key={index} speed={1.2 + index * .08} floatIntensity={.32}>
          <mesh position={position}>
            <sphereGeometry args={[index === 3 ? .38 : .18, 32, 32]} />
            <meshStandardMaterial
              color={index === 3 ? "#a3e635" : index % 2 ? "#fbbf24" : "#22d3ee"}
              emissive={index === 3 ? "#a3e635" : index % 2 ? "#fbbf24" : "#22d3ee"}
              emissiveIntensity={2}
              roughness={.22}
            />
          </mesh>
        </Float>
      ))}
      {nodes.slice(1).map((point, index) => (
        <Line key={index} points={[nodes[index], point]} color="#22d3ee" lineWidth={.7} transparent opacity={.45} />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, .012, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={.55} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.48, .009, 8, 96]} />
        <meshBasicMaterial color="#a3e635" transparent opacity={.35} />
      </mesh>
      <Sparkles count={55} scale={5} size={1.4} speed={.25} color="#22d3ee" />
    </group>
  );
}

export function ExpertCore3D({ interactive = true }: { interactive?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 6.5], fov: 48 }} dpr={[1, 1.5]}>
      <ambientLight intensity={.35} />
      <pointLight position={[3, 3, 4]} intensity={18} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#fbbf24" />
      <Network />
      {interactive && <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.35} />}
    </Canvas>
  );
}