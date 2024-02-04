import { React, useEffect } from 'react';
import './PlaylistComponent.css';
import { useNavigate } from 'react-router-dom';



const PlaylistComponent = ({ name, imageLink, href, access }) => {


    const navigate = useNavigate();

    const onClickHandle = () => {
        console.log('clicked');
        navigate('/planet?playlist=' + href + '&access=' + access);
    }


    return (
        <div className='playlist-item' onClick={onClickHandle}>
            <img className='playlist-image' src={imageLink} alt='' />
            <p className='playlist-text'>{name}</p>
        </div>
    );
};

export default PlaylistComponent;