document.getElementById('login-button').addEventListener('click', () => {
    // Skicka användaren till din Netlify function som hanterar Spotify-login
    window.location.href = '/.netlify/functions/login'; // Detta anropar login.js
});
// window.onload = function() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const code = urlParams.get('code'); // Hämta 'code' från URL

//     if (code) {
//         fetch('/.netlify/functions/callback?code=' + code)
//             .then(response => response.json())
//             .then(data => {
//                 if (data.access_token) {
//                     // ✅ Spara access token i sessionStorage
//                     sessionStorage.setItem('spotify_access_token', data.access_token);

//                     // ✅ Omdirigera till startsidan eller föregående sida
//                     const redirectUri = sessionStorage.getItem('redirect_from') || '/';
//                     window.location.href = redirectUri;
//                 } else {
//                     console.error('Failed to get access token');
//                 }
//             })
//             .catch(error => {
//                 console.error('Error fetching access token:', error);
//             });
//     } else {
//         console.error('No code found in URL');
//     }
// };

window.onload = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Hämta 'code' från URL

    if (code) {
        try {
            const resp = await fetch(`/.netlify/functions/callback?code=${code}`);
            const data = await resp.json();
            if (data.access_token) {
                sessionStorage.setItem('spotify_access_token', data.access_token);
                window.location.href = '/';
            } else {
                console.error("Failed to get access token");
            }
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    } else {
        console.error('No code found in URL');
    }
}