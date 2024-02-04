import axios from 'axios'
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

const refreshAccessToken = async () => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');

    await fetch(`http://localhost:8888/refresh_token?refresh_token=${getLocalRefreshToken()}`, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include',
        headers: headers
    }).then(response => {
        console.log(response)
        return response.text();  // Read the response as a text string
    }).then(data => {
        console.log(data);  // Log the response data
        const { access_token } = JSON.parse(data);
        console.log(access_token)  // Parse the response data as JSON
        setLocalAccessToken(access_token);
        console.log("reloading")
        window.location.reload();
        spotifyApi.setAccessToken(access_token);
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());


        const refresh_token = getLocalRefreshToken();
        const expires_in = getLocalAccessToken();

        const queryParams = new URLSearchParams({
            access_token,
            refresh_token,
            expires_in,
        }).toString();

        // redirect to homepage
        window.location.replace(`${window.location.origin}/?${queryParams}`)
        window.location.reload();
        return;
    }).catch(error => {
        console.error(error);
    });
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
        refreshAccessToken();
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
        refreshAccessToken();
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

    window.history.pushState({}, document.title, "/");
    window.location = window.location.host;
    window.location.reload();
};

export const clearMemory = () => {
    window.localStorage.clear();
    window.location.reload();

}


// Allows access to spotify api
export const accessToken = getAccessToken();

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

// Get users top 2 songs
var songs = async function getCurrentUserTopSongs() {
    let songList = [];

    await spotifyApi.getMyTopTracks({ limit: 2, time_range: 'short_term' })
        .then(function (data) {
            var topSongs = data.body.items;
            songList.push(topSongs[0].id)
            songList.push(topSongs[1].id)
            //console.log('songs', songList)
        })
    console.log('songs', songList)
    return songList;
}();

// Get users top 3 artists
var artists = async function getCurrentUserTopArtists() {
    let artistList = [];
    await spotifyApi.getMyTopArtists({ limit: 3, time_range: 'medium_term' })
        .then(function (data) {
            var topArtist = data.body.items;
            artistList.push(topArtist[0].id)
            artistList.push(topArtist[1].id)
            artistList.push(topArtist[2].id)
            //console.log('artist ', artistList)
        })
    console.log('artist ', artistList)
    return artistList;
}();

// Use spotify api to get reccomendations based on songs and artists
async function getCurrentUserRecommendations(acousticness, danceability, instrumentalness, energy, popularity) {
    console.log(songs)
    console.log(artists.length)
    let tracks_list = [];
    let tracks;
    await spotifyApi.getRecommendations({
        seed_artists: await artists, seed_tracks: await songs,
        target_acousticness: (acousticness / 100), target_danceability: (danceability / 100),
        target_instrumentalness: (instrumentalness / 100), target_energy: (energy / 100), target_popularity: popularity, limit: 30
    })
        .then(function (data) {
            console.log(data)
            tracks = data.body.tracks
        }, function (err) {
            console.log('Something went wrong getting new recommendations!', err);
        })
    tracks.forEach(element => tracks_list.push(element.uri));
    return tracks_list;
}

// Create a new playlist and add recomended tracks and passing in params from frontend
export const createUserPlaylist = async function createUserPlaylist(acousticness, danceability, instrumentalness, energy, popularity) {
    let tracks = await getCurrentUserRecommendations(acousticness, danceability, instrumentalness, energy, popularity)
    console.log('tracks: ', tracks)
    spotifyApi.createPlaylist("Discover More Music", { 'public': false })
        .then(async function (data) {
            await spotifyApi.addTracksToPlaylist(data.body.id, tracks)
            // log link to playlist
            console.log(data.body.external_urls.spotify);
            var newWindow = window.open();
            newWindow.location = data.body.external_urls.spotify;
            //window.open(data.body.external_urls.spotify, "_blank")


        })
};


export const getUsersPlaylists = async () => {
    try {
        const data = await spotifyApi.getUserPlaylists();
        console.log("USER PLAYLISTS", data);
        return data;
    } catch (e) {
        console.error("USER PLAYLISTS error", e);
    }
}
