import { Canvas, } from '@react-three/fiber';
import HomePlanet from './HomePlanet';
import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';

// fetch a list of data from the server
// for each item in the list create a new component



const Playlists = () => {
    const [data, setData] = useState([]);

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

    return (
        <>
            <h1 className='title-text'>Your Playlists</h1>
            <h1 className='desc-text'>What Planet do you wish to visit?</h1>
            <p className='desc-text'>Here are your playlists: {data}</p>
            <div style={{ width: "0vw", height: "0vh" }}><Canvas /></div>
        </>
    );
};

export default Playlists;