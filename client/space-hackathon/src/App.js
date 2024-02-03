import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* main page, has a circle div with 2 button options. sign in with spotify and use url. */}
        <div className="circle">
          <button className="button login">Sign in with Spotify</button>
          <button className="button playlist-url">Use Playlist URL</button>
        </div>
      </header>
    </div>
  );
}

export default App;
