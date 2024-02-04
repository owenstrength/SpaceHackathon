import React from 'react';
import { Canvas, } from '@react-three/fiber';
import HomePlanet from './HomePlanet';
import Starfield from './components/Starfield';

const Home = () => {
    return (
        <>
            <h1 className='title-text'>Playlist Planet</h1>
            <h1 className='desc-text'>Find your a planet with your music</h1>
            <Canvas>
                <ambientLight intensity={Math.PI / 2} />
                <pointLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * -0.1} />
                <pointLight position={[-10, -10, -10]} decay={0.2} intensity={Math.PI / 4} />
                <HomePlanet />

            </Canvas>
            <div className='button-container'>
                <button className="button login">Sign in with Spotify</button>
                <button className="button playlist-url">Use Playlist URL</button>
            </div >
        </>
    );
};

export default Home;