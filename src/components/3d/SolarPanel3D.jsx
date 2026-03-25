import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, Environment, ContactShadows } from '@react-three/drei';

function PanelModel() {
  const group = useRef();

  return (
    <group ref={group} dispose={null}>
      {/* Aluminum Frame */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Solar Cells / Dark Glass surface */}
      <mesh castShadow receiveShadow position={[0, 0.055, 0]}>
        <boxGeometry args={[4, 0.02, 2]} />
        <meshPhysicalMaterial 
          color="#0B1120"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Glowing Green Grid Lines (representing solar cells matrix) */}
      <gridHelper 
        args={[4, 12, '#22c55e', '#166534']} 
        position={[0, 0.07, 0]} 
        scale={[1, 1, 0.5]}
      />
      
      {/* Subtle Orange back-glow */}
      <pointLight position={[0, -0.5, 0]} intensity={20} color="#f59e0b" distance={3} />
    </group>
  );
}

export default function SolarPanel3D({ className = "w-full h-full cursor-grab active:cursor-grabbing" }) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 3, 6], fov: 45 }}>
        {/* Match Theme with Green/Orange ambient lighting */}
        <ambientLight intensity={0.4} />
        <spotLight position={[5, 10, 5]} angle={0.2} penumbra={1} intensity={150} color="#ffffff" castShadow />
        <pointLight position={[-5, 5, -5]} intensity={200} color="#22c55e" /> {/* Green glow lighting */}
        <pointLight position={[5, 5, -5]} intensity={100} color="#f59e0b" /> {/* Orange accent */}

        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0.1, 0.5, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} floatingRange={[-0.2, 0.2]}>
            <PanelModel />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#22c55e" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
