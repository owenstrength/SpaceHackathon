import React, { useEffect, useState } from 'react';
import { Canvas, } from '@react-three/fiber';
import Starfield from './components/Starfield';
import PlanetComp from './components/PlanetComp';
import { useParams } from 'react-router-dom';
import { sendPlaylistToServer } from './scripts/FetchFromServer';




const Planet = () => {
    const [data, setData] = useState(null);

    var response = {}

    console.log(response)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessTokenIn = params.get('access');
        const href = params.get('href');
        const fetchData = async () => {
            await sendPlaylistToServer(href, accessTokenIn).then(response => { setData(response) });
        }
        if (data === null) {
            fetchData();

        }

    }, [data]);

    return (
        <>
            {/* if data === null. loading animation*/}
            {(data === null && (
                <>
                    <h1>Loading</h1>
                    <Canvas />
                </>
            )) || (
                    <>
                        <h1 className='title-text'>{data.planetTitle}</h1>
                        <div className='desc-container' style={{ width: '50%' }}><h1 className='desc-text'>{data.planetDesc}</h1></div>
                        <Canvas>
                            <ambientLight intensity={Math.PI / 2} />
                            <pointLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * -0.1} />
                            <pointLight position={[-10, -10, -10]} decay={0.2} intensity={Math.PI / 4} />
                            <PlanetComp imageLink={data.imageLink} />

                        </Canvas>
                        <div className='desc-container' style={{ width: '50%' }}><h1 className='desc-text'>{data.planetDesc}</h1></div>
                    </>
                )}


        </>
    );
};

export default Planet;