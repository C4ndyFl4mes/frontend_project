window.onSpotifyWebPlaybackSDKReady = () => {
    // Hämta access token och spela upp musik
    fetchAccessToken().then(token => {
        getSpotifyPlayer(token);
    });
}

// Funktion för att hämta access token från callback
async function fetchAccessToken() {
    // Hämta access token från Netlify function (callback.js)
    const response = await fetch('/.netlify/functions/callback');
    const data = await response.json();

    // Returnera access token
    return data.access_token;
}

// Funktion för att spela upp musik via Spotify Web Playback SDK
async function getSpotifyPlayer(token) {
    const player = new Spotify.Player({
        name: "My Spotify Player",
        getOAuthToken: cb => { cb(token); },
        volume: 0.5,
    });

    player.on('ready', ({ device_id }) => {
        console.log('The Web Playback SDK is ready with device ID', device_id);
        // Sätt upp musiken att spela
        player.play({
            uris: ['spotify:track:6rqhFgbbKwnb9MLmUQDhxD'], // Test låt
        });
    });

    player.connect();
}

