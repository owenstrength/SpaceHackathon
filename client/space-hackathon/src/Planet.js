import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Starfield from './components/Starfield';
import PlanetComp from './components/PlanetComp';
import { useParams } from 'react-router-dom';
import { sendPlaylistToServer } from './scripts/FetchFromServer';
import PlaylistComponent from './components/PlaylistComponent';
import { PlaneGeometry } from 'three';

const getTextFromFile = async () => {
    try {
        const response = await fetch('textDisc.txt');
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching text from file:', error);
        return null;
    }
};

const Planet = () => {
    const [txt, setTxt] = useState('');

    useEffect(() => {
        getTextFromFile().then((text) => {
            if (text) {
                setTxt(text);
            }
        });
    }, []);

    // Rest of the component code...

    return (
        <>

            <h1 className='title-text planet-page'>Playlist Planet</h1>
            <div className='desc-container' style={{ width: '50%' }}><h1 className='desc-text'>{txt}</h1></div>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <pointLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * 1.6} />
                <pointLight position={[-10, -10, -10]} decay={0.2} intensity={Math.PI / 4} />
                <PlanetComp />

            </Canvas>
        </>
    );
};

export default Planet;
