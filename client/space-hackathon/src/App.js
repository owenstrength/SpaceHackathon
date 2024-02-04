import './App.css';
import { React, useEffect, useState } from 'react';

import Header from './Header';
import Home from './Home';
import Starfield from './components/Starfield';

function App() {

  return (
    <div className="App">

      <header className="App-header" style={{ height: '100%', }}>
        <Starfield />
        <Header />
        <Home />



        {/*}
          <button className="button login">Sign in with Spotify</button>
          <button className="button playlist-url">Use Playlist URL</button>
  */}
      </header>
    </div>
  );
}

export default App;
