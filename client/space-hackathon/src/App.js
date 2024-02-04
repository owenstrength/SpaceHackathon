import './App.css';
import { React, useEffect, useState } from 'react';

import Header from './Header';
import Home from './Home';
import PageNotFound from './components/PageNotFound';
import Starfield from './components/Starfield';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Playlists from './Playlists';
import Planet from './Planet';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header" style={{ height: '100%' }}>
          <Starfield />
          <Header />
          <Routes>
            <Route exact path="/" element={<><Home /></>} />
            <Route exact path="/playlists" element={<><Playlists /></>} />
            <Route exact path="/collection" element={<></>} />
            <Route exact path="/planet" element={<><Planet /></>} />

            {/* Add more routes here */}

            <Route path="*" element={<><PageNotFound /></>} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
