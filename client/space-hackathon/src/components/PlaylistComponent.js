import React from 'react';
import './PlaylistComponent.css';
import { sendPlaylistToServer } from '../scripts/FetchFromServer';
import { useNavigate } from 'react-router-dom';



const PlaylistComponent = ({ name, imageLink, href, access }) => {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/planet?playlist=' + href + '&access=' + access);
    }


    return (
        <div className='playlist-item' onClick={onClick()}>
            <img className='playlist-image' src={imageLink} alt='' />
            <p className='playlist-text'>{name}</p>
        </div>
    );
};

export default PlaylistComponent;