import axios from 'axios'

export const sendPlaylistToServer = async (href, access) => {
    console.log("Sending playlist to server", href, access);

    const dataToSend = {
        playlist: href,
        access_token: access,
        // ... other key-value pairs
    };

    const jsonData = JSON.stringify(dataToSend);

    const response = await axios.post('http://localhost:5000/get_playlist_image', jsonData, {
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers if needed
        },
    }).then(response => {
        // Handle the response
        console.log(response.data);
    })
        .catch(error => {
            // Handle errors
            console.error(error);
        });
}