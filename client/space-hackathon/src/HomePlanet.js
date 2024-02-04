import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshStandardMaterial, TextureLoader } from 'three';

const HomePlanet = (props) => {
    const meshRef = useRef();
    const [active, setActive] = useState(false);
    const [mousePos, setMousePos] = useState({});

    const texture = new TextureLoader().load('beast.png');


    // useEffect(() => {
    //     const handleMouseDown = () => setActive(true);
    //     const handleMouseUp = () => setActive(false);
    //     const handleMouseMove = (event) => {
    //         setMousePos({ x: event.clientX, y: event.clientY });
    //     };

    //     window.addEventListener('mousedown', handleMouseDown);
    //     window.addEventListener('mouseup', handleMouseUp);
    //     window.addEventListener('mousemove', handleMouseMove);

    //     return () => {
    //         window.removeEventListener('mousedown', handleMouseDown);
    //         window.removeEventListener('mouseup', handleMouseUp);
    //         window.removeEventListener('mousemove', handleMouseMove);
    //     };
    // }, []);

    useFrame((state, delta) => {
        if (active) {
            // if active move let mouse move planet
            var targetX = mousePos.x * 0.001;
            var targetY = mousePos.y * 0.001;

            meshRef.current.rotation.y += 0.5 * (targetX - meshRef.current.rotation.y);
            meshRef.current.rotation.z += 0.5 * (targetY - meshRef.current.rotation.z);
            console.log("active")

        } else {
            meshRef.current.rotation.y += delta / 4;
            meshRef.current.rotation.z += delta / 16;
        }
    });

    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1 : 1}
        >
            <sphereGeometry args={[2.3, 50, 50]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    );
};

export default HomePlanet;
