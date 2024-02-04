import axios from 'axios'

export const sendPlaylistToServer = async (href, access) => {
    try {
        const response = await axios.post('http://localhost:5000/get_playlist_image', data = {
            'playlist': href,
            'access_token': access
        });
        const data = response.data;
        console.log("Playlist sent to server", data);
        return data;
    } catch (error) {
        console.error("Playlist send to server error", error);
    }
}