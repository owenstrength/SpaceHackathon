import axios from 'axios'
import { CLIENT_ID, CLIENT_SECRET } from './config.js';
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();




// Map for localStorage keys
const LOCALSTORAGE_KEYS = {
    accessToken: 'spotify_access_token',
    refreshToken: 'spotify_refresh_token',
    expireTime: 'spotify_token_expire_time',
    timestamp: 'spotify_token_timestamp',
}

// Map to retrieve localStorage values
const LOCALSTORAGE_VALUES = {
    accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
    refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
    expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
    timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
};


const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Get the query params off the window's URL
export const getHashParams = () => {
    const hashParams = {};
    let e;
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
};



// Access Token
const getAccessToken = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
        [LOCALSTORAGE_KEYS.accessToken]: urlParams.get('access_token'),
        [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get('refresh_token'),
        [LOCALSTORAGE_KEYS.expireTime]: urlParams.get('expires_in'),
    };
    const { error, access_token, refresh_token } = getHashParams();

    if (!access_token && !refresh_token) {
        console.log("NO ACCESS TOKEN")

    }


    if (error) {
        console.log("ACCESS TOKEN ERROR")
        console.error(error);
        clearMemory();
    }


    // If there is a valid access token in localStorage, use that
    if (LOCALSTORAGE_VALUES.accessToken && LOCALSTORAGE_VALUES.accessToken !== 'undefined') {
        spotifyApi.setAccessToken(LOCALSTORAGE_VALUES.accessToken);
        spotifyApi.setRefreshToken(LOCALSTORAGE_VALUES.refreshToken);

        return LOCALSTORAGE_VALUES.accessToken;
    } else if (access_token) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        window.location.reload(false)
        return access_token;
    }

    // If there is a token in the URL query params, user is logging in for the first time
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
        // Store the query params in localStorage
        for (const property in queryParams) {
            window.localStorage.setItem(property, queryParams[property]);
        }
        // Set timestamp
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        // Return access token from query params

        return queryParams[LOCALSTORAGE_KEYS.accessToken];
    }

    // We should never get here!
    return false;
};

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
    // Clear all localStorage items

    const LOCALSTORAGE_KEYS = {
        accessToken: 'spotify_access_token',
        refreshToken: 'spotify_refresh_token',
        expireTime: 'spotify_token_expire_time',
        timestamp: 'spotify_token_timestamp',
    }

    for (const property in LOCALSTORAGE_KEYS) {
        window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
    }
    // Navigate to homepage

};

export const clearMemory = () => {
    window.localStorage.clear();
    window.location.reload();

}


// Allows access to spotify api
export const accessToken = getAccessToken();

export const setAccessToken = (accessToken) => {
    spotifyApi.setAccessToken(accessToken);
    return accessToken;
}

spotifyApi.setAccessToken(accessToken)
// Get info about user
export const getCurrentUserProfile = async () => {
    try {
        const data = await spotifyApi.getMe();
        console.log("USER PROFILE", data);
        return data;
    } catch (e) {
        console.error("USER PROFILE error", e);
    }
};



export const getUsersPlaylists = async (accessTokenIn) => {
    try {
        const response1 = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessTokenIn}`
            }
        });
        const data1 = response1.data;
        const username = data1.display_name;


        const response = await axios.get('https://api.spotify.com/v1/me/playlists/?limit=50', {
            headers: {
                'Authorization': `Bearer ${accessTokenIn}`
            }
        });
        const data = response.data;

        // get the genre of each playlist


        console.log("USER PLAYLISTS", data);
        return [username, data];
    } catch (error) {
        console.error("USER PLAYLISTS error", error);
    }
}

export const getUsersPlaylists_USERNAME = async (username) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/users/' + username + '/playlists/?limit=50', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = response.data;
        console.log("USER PLAYLISTS", data);
        return [username, data];
    } catch (error) {
        console.error("USER PLAYLISTS error", error);
    }
}
