import { Canvas, } from '@react-three/fiber';
import HomePlanet from './HomePlanet';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { getUsersPlaylists, getUsersPlaylists_USERNAME, setAccessToken } from './scripts/Spotify';
import PlaylistComponent from './components/PlaylistComponent';

// fetch a list of data from the server
// for each item in the list create a new component

const Playlists = () => {
    const [data, setData] = useState(null);
    const [signedIn, setSignedIn] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [username, setUsername] = useState('');
    const [arrayDataItems, setArrayDataItems] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessTokenIn = params.get('access_token');
        setAccessToken(accessTokenIn);
        setSignedIn(accessToken !== null);
        if (accessToken !== '' && data === null && signedIn === true) {
            try {
                getUsersPlaylists(accessToken).then(response => {
                    if (response === undefined || response === null || response === '') {
                        console.log('failed', response);
                        return;

                    }
                    setUsername(response[0])
                    console.log('username', response[0]);
                    var filteredData = [];
                    for (var i = 0; i < response[1].items.length; i++) {
                        if (response[1].items[i].owner.id === response[0] && response[1].items[i].images.length > 0) {
                            filteredData.push(response[1].items[i]);
                        }

                    }
                    filteredData = filteredData.slice(0, 9);
                    setData(filteredData);

                    console.log('FILtERED', filteredData);

                    setArrayDataItems(filteredData);
                });
            } catch (error) {
                console.error();
            }
        }
    }, [accessToken, signedIn, username, data]);

    const buttonClick = () => {
        getUsersPlaylists_USERNAME(username).then(response => {
            if (response === undefined || response === null || response === '') {
                console.log('failed', response);
                return;

            }
            console.log('username', response[0]);
            var filteredData = [];
            for (var i = 0; i < response[1].items.length; i++) {
                if (response[1].items[i].owner.id === response[0] && response[1].items[i].images.length > 0) {
                    filteredData.push(response[1].items[i]);
                }

            }
            filteredData = filteredData.slice(0, 9);
            setData(filteredData);

            console.log('FILtERED', filteredData);

            setArrayDataItems(filteredData);
        });

    }

    return (
        <>
            <h1 className='title-text'>Your Playlists</h1>

            {(!signedIn && (
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
                                buttonClick();
                            }}
                        >👍</button>
                    </div>
                </>
            )) || (
                    <>
                        <h1 className='desc-text' style={{ 'margin-bottom': '-40px' }}>What Planet do you wish to visit?</h1 >
                        <div className='playlist-container'>
                            {arrayDataItems && arrayDataItems.map((item, index) => {
                                return (
                                    <PlaylistComponent key={index} name={item.name} imageLink={item.images[0].url} href={item.href} access={accessToken} />
                                )
                            })}

                        </div>
                    </>
                )}


            <div style={{ width: "0vw", height: "0vh" }}><Canvas /></div>
        </>
    );
};

export default Playlists; 