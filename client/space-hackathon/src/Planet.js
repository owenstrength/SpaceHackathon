import React, { useEffect, useState } from 'react';
import { Canvas, } from '@react-three/fiber';
import Starfield from './components/Starfield';
import PlanetComp from './components/PlanetComp';
import { useParams } from 'react-router-dom';
import { sendPlaylistToServer } from './scripts/FetchFromServer';




const Planet = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    var response = {}

    console.log(response)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessTokenIn = params.get('access');
        const href = params.get('href');
        const fetchData = async () => {
            var res = await sendPlaylistToServer(href, accessTokenIn).then(response => {
                console.log('SEND RES', response)
                setData(response)

            });
            setData(res.data);
            setIsLoading(false);

        }
        if (data === null || data === undefined || data === '') {
            fetchData();

        }

    }, [data, isLoading]);

    return (
        <>
            {/* if data === null. loading animation*/}
            {(isLoading && (
                <>
                    <h1>Loading</h1>
                    <Canvas />
                </>
            )) || (
                    <>
                        <h1 className='title-text'>Playlist Planet</h1>
                        <div className='desc-container' style={{ width: '50%' }}><h1 className='desc-text'>temp</h1></div>
                        <Canvas>
                            <ambientLight intensity={Math.PI / 2} />
                            <pointLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * -0.1} />
                            <pointLight position={[-10, -10, -10]} decay={0.2} intensity={Math.PI / 4} />
                            <PlanetComp imageLink={data.imageLink} />

                        </Canvas>
                        <div className='desc-container' style={{ width: '50%' }}><h1 className='desc-text'>temp</h1></div>
                    </>
                )}


        </>
    );
};

export default Planet;