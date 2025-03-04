document.getElementById('login-button').addEventListener('click', () => {
    // Skicka användaren till din Netlify function som hanterar Spotify-login
    window.location.href = '/.netlify/functions/login'; // Detta anropar login.js
});
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Hämta 'code' från URL

    if (code) {
        fetch('/.netlify/functions/callback?code=' + code)
            .then(response => response.json())
            .then(data => {
                if (data.access_token) {
                    // ✅ Spara access token i sessionStorage
                    sessionStorage.setItem('spotify_access_token', data.access_token);

                    // ✅ Omdirigera till startsidan eller föregående sida
                    const redirectUri = sessionStorage.getItem('redirect_from') || '/';
                    window.location.href = redirectUri;
                } else {
                    console.error('Failed to get access token');
                }
            })
            .catch(error => {
                console.error('Error fetching access token:', error);
            });
    } else {
        console.error('No code found in URL');
    }
};
// window.onSpotifyWebPlaybackSDKReady = () => {
//     // Hämta access token.
//     fetchToken().then(token => {
//         if(!token) {
//             console.log("No token available.");
//             return;
//         } else {
//             console.log("Token available: " + token);
//             sessionStorage.setItem("usertoken", JSON.stringify(token));
//         }
        
//         // getSpotifyPlayer(token);

//     });
// }

// // Funktion för att hämta access token från callback
// async function fetchAccessToken() {
//     // Hämta access token från Netlify function (callback.js)
//     const response = await fetch('/.netlify/functions/callback');
//     const data = await response.json();
//     // sessionStorage.setItem("usertoken", JSON.stringify(data.access_token));
//     // Returnera access token
//     return data.access_token;
// }

// Funktion för att spela upp musik via Spotify Web Playback SDK
// async function getSpotifyPlayer(token) {
//     const player = new Spotify.Player({
//         name: "My Spotify Player",
//         getOAuthToken: cb => { cb(token); },
//         volume: 0.5,
//     });

//     player.on('ready', ({ device_id }) => {
//         console.log('The Web Playback SDK is ready with device ID', device_id);
//         // Sätt upp musiken att spela
//         player.play({
//             uris: ['spotify:track:6rqhFgbbKwnb9MLmUQDhxD'], // Test låt
//         });
//     });

//     player.connect();
// }

// async function fetchToken() {
//     try {
//         const response = await fetch('/.netlify/functions/callback');
//         const data = await response.json();

//         sessionStorage.setItem("usertoken", JSON.stringify(data.access_token));
//         return data.access_token;
//     } catch(error) {
//         console.error(error);
//     }
// }