import React, { useEffect, useState } from 'react';
import { Canvas, } from '@react-three/fiber';
import Starfield from './components/Starfield';
import PlanetComp from './components/PlanetComp';
import { useParams } from 'react-router-dom';
import { sendPlaylistToServer } from './scripts/FetchFromServer';




const Loading = () => {
    const [data, setData] = useState({ description: 'Loading...' });
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] = useState('flex');
    const [display2, setDisplay2] = useState('none');

    const params = new URLSearchParams(window.location.search);
    const accessTokenIn = params.get('access');
    const href = params.get('playlist');

    var prev = false;

    const onButtonClick = async () => {
        console.log('clicked');
        setDisplay('none');
        setDisplay2('flex');

        var response = await fetch('http://localhost:5000/get_playlist_image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlist: href, access_token: accessTokenIn })
        }).then(response => {
            console.log(response);
            prev = true;
        })

    };

    const onButtonClick2 = () => {
        window.location.href = 'http://localhost:3000/planet';
    }

    if (!prev) {
        return (
            <>
                <h1 className='title-text' style={{ display: display2 }}>Loading...</h1>
                <h1 className='title-text' style={{ display: display }}>Push to Pipeline</h1>
                <br></br>
                <br></br>
                <button className="button" onClick={onButtonClick} style={{ display: display }}>Create New</button>
                <button className="button" onClick={onButtonClick2} style={{ display: display }}>Access Most Recent

                </button >
                <br></br>
                <br></br>
                <div >
                    <img src='temp.png' width={'200px'} style={{ display: display }}></img>
                </div>
            </>
        );
    } else {

    };
}

export default Loading;