import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const CasinoChip = ({ position, value, color, rotationSpeed = 0.01 }) => {
    const chipRef = useRef();
    const chipHeight = 0.2;
    const chipRadius = 1;

    // Define colors based on chip value
    const getChipColor = () => {
        switch (color) {
            case 'red': return '#e53935';
            case 'blue': return '#1e88e5';
            case 'green': return '#43a047';
            case 'black': return '#212121';
            case 'purple': return '#8e24aa';
            case 'gold': return '#ffc107';
            default: return '#e53935';
        }
    };

    // Rotate the chip
    useFrame(() => {
        if (chipRef.current) {
            chipRef.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <group position={position} ref={chipRef}>
            {/* Main chip body */}
            <RoundedBox
                args={[chipRadius * 2, chipHeight, chipRadius * 2]}
                radius={0.05}
                smoothness={4}
            >
                <meshStandardMaterial color={getChipColor()} />
            </RoundedBox>

            {/* Edge pattern */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[chipRadius, chipRadius, chipHeight, 32, 1, false]} />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.3}
                    metalness={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Center circle */}
            <mesh position={[0, chipHeight / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[chipRadius * 0.7, 32]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Value text on top */}
            <Text
                position={[0, chipHeight / 2 + 0.01, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.5}
                color="#000000"
                font="Arial"
                anchorX="center"
                anchorY="middle"
            >
                ${value}
            </Text>

            {/* Value text on bottom */}
            <Text
                position={[0, -chipHeight / 2 - 0.01, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                fontSize={0.5}
                color="#000000"
                font="Arial"
                anchorX="center"
                anchorY="middle"
            >
                ${value}
            </Text>
        </group>
    );
};

export default CasinoChip; 