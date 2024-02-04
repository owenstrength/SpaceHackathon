import React, { useEffect, useState } from 'react';
import { Canvas, } from '@react-three/fiber';
import Starfield from './components/Starfield';
import PlanetComp from './components/PlanetComp';
import { API } from 'aws-amplify';




const Planet = () => {
    const [data, setData] = useState([{}]);
    useEffect(() => {
        // Call AWS Amplify API here
        // API.get('myApiName', '/myEndpoint')
        //     .then(response => {
        //         // Handle API response
        //         console.log(response);
        //         setData(response);
        //     })
        //     .catch(error => {
        //         // Handle API error
        //         console.error(error);
        //         data.planetTitle = 'Test Planet';
        //         data.planetDesc = 'IDK this shit prolly evil and got monseter';
        //         data.imageLink = 'https://cdn1.epicgames.com/ue/product/Screenshot/Untitled-3-1920x1080-0398f2a56a662dd1c53553ff1dfbbeb7.jpg?resize=1&w=1920';
        //     });
        var res = {}
        res.planetTitle = 'Test Plannet';
        res.planetDesc = 'IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter IDK this shit prolly evil and got monseter ';
        res.imageLink = 'https://cdn1.epicgames.com/ue/product/Screenshot/Untitled-3-1920x1080-0398f2a56a662dd1c53553ff1dfbbeb7.jpg?resize=1&w=1920';
        if (data.length === 0) {
            setData(res)
        }
    }, [data]);

    return (
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
    );
};

export default Planet;