import React from 'react';

const Header = () => {
    return (
        <header className='main-header'>
            <a className='header-text' href='https://github.com/owenstrength/SpaceHackathon'>Github</a>
            <a className='header-text' href='http://localhost:3000/'> Playlist Planet</a>
            <a className='header-text' href='http://localhost:8888/login'>Sign-In</a>
        </header>
    );
};

export default Header;
