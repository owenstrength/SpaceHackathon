import './App.css';
import React from 'react';
import { Canvas, } from '@react-three/fiber';
import HomePlanet from './HomePlanet';
import Header from './Header';

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ height: '100%' }}>
        <Header />
        {/* main page, has a circle div with 2 button options. sign in with spotify and use url. */}
        <Canvas>
          <ambientLight intensity={Math.PI / 2} />
          <pointLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * 1.5} />
          <pointLight position={[-10, -10, -10]} decay={0.2} intensity={Math.PI / 4} />
          <HomePlanet />
        </Canvas>

        {/*}
          <button className="button login">Sign in with Spotify</button>
          <button className="button playlist-url">Use Playlist URL</button>
  */}
      </header>
    </div>
  );
}

export default App;
