import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import CasinoChip from './CasinoChip';

const ChipsScene = ({ className }) => {
    // Define different chip values and colors
    const chips = [
        { value: 5, color: 'red', position: [-2.5, 0, 0], rotationSpeed: 0.01 },
        { value: 10, color: 'blue', position: [-1.25, 0, 0.5], rotationSpeed: 0.015 },
        { value: 25, color: 'green', position: [0, 0, 0], rotationSpeed: 0.02 },
        { value: 50, color: 'purple', position: [1.25, 0, 0.5], rotationSpeed: 0.015 },
        { value: 100, color: 'black', position: [2.5, 0, 0], rotationSpeed: 0.01 },
    ];

    return (
        <div className={`w-full h-full ${className}`}>
            <Canvas shadows>
                <PerspectiveCamera makeDefault position={[0, 3, 6]} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} />

                {/* Environment and controls */}
                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI / 2.5}
                    autoRotate
                    autoRotateSpeed={0.5}
                />

                {/* Casino chips */}
                {chips.map((chip, index) => (
                    <CasinoChip
                        key={index}
                        position={chip.position}
                        value={chip.value}
                        color={chip.color}
                        rotationSpeed={chip.rotationSpeed}
                    />
                ))}

                {/* Table surface */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <meshStandardMaterial color="#0a5c36" roughness={0.8} metalness={0.2} />
                </mesh>
            </Canvas>
        </div>
    );
};

export default ChipsScene; 