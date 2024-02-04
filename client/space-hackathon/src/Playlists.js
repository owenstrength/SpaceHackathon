import { Canvas, } from '@react-three/fiber';
import HomePlanet from './HomePlanet';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

// fetch a list of data from the server
// for each item in the list create a new component

const Playlists = () => {
    const [data, setData] = useState([]);
    const [signedIn, setSignedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.get('yourApiName', '/yourEndpoint');
                setData(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessTokenIn = params.get('access_token');
        setAccessToken(accessTokenIn);
        setSignedIn(accessToken !== null);
    }, [accessToken]);

    return (
        <>
            <h1 className='title-text'>Your Playlists</h1>

            {!signedIn && (
                <>
                    <br></br>
                    <div className='username-container'>
                        <input className='button text-in'
                            type="text"
                            placeholder="Enter Spotify Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button className="button thumb"
                            onClick={() => {
                                // get data with username;
                            }}
                        >👍</button>
                    </div>
                </>
            )}
            <h1 className='desc-text' style={{ 'margin-bottom': '-40px' }}>What Planet do you wish to visit?</h1 >
            <p className='desc-text'>Here are your playlists: {data}</p>

            <div style={{ width: "0vw", height: "0vh" }}><Canvas /></div>
        </>
    );
};

export default Playlists;