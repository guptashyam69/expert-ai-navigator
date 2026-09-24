import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sparkles, Trail } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

const nodes: [number, number, number][] = [
  [-2.2, 1.2, 0], [-1.8, -1.35, .35], [-.65, 1.75, -.25],
  [.1, .15, .55], [.8, -1.6, -.25], [1.45, 1.2, .2], [2.25, -.55, 0],
];

function Network() {
  const group = useRef<Group>(null);
  const inner = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * .12;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * .25) * .08;
    if (inner.current) {
      inner.current.rotation.x -= delta * .24;
      inner.current.rotation.z += delta * .16;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[.78, 2]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.2} wireframe transparent opacity={.7} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[.58, 3]} />
        <meshPhysicalMaterial color="#06141b" emissive="#a3e635" emissiveIntensity={.7} roughness={.15} metalness={.75} transmission={.25} />
      </mesh>
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
        <Line key={index} points={[nodes[index] ?? nodes[0] ?? [0, 0, 0], point]} color="#22d3ee" lineWidth={.7} transparent opacity={.45} />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, .012, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={.55} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.48, .009, 8, 96]} />
        <meshBasicMaterial color="#a3e635" transparent opacity={.35} />
      </mesh>
      <mesh rotation={[.7, .4, .25]}>
        <torusGeometry args={[1.9, .006, 8, 128]} />
        <meshBasicMaterial color="#fbbf24" transparent opacity={.3} />
      </mesh>
      <Trail width={1.5} length={4} color="#a3e635" attenuation={(width) => width}>
        <Float speed={3} rotationIntensity={1.2} floatIntensity={1.6}>
          <mesh position={[1.7, .4, .2]}>
            <sphereGeometry args={[.055, 12, 12]} />
            <meshBasicMaterial color="#a3e635" />
          </mesh>
        </Float>
      </Trail>
      <Sparkles count={55} scale={5} size={1.4} speed={.25} color="#22d3ee" />
    </group>
  );
}

export function ExpertCore3D({ interactive = true, compact = false }: { interactive?: boolean; compact?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, compact ? 7.3 : 6.5], fov: 48 }} dpr={[1, 1.5]}>
      <fog attach="fog" args={["#071117", 7, 13]} />
      <ambientLight intensity={.35} />
      <pointLight position={[3, 3, 4]} intensity={18} color="#22d3ee" />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#fbbf24" />
      <Network />
      {interactive && <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={.35} />}
    </Canvas>
  );
}