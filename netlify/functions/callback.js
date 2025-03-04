const { AuthorizationCode } = require('simple-oauth2');
const querystring = require('querystring');

const oauth2 = new AuthorizationCode({
    client: {
        id: process.env.SPOTIFY_CLIENT_ID,
        secret: process.env.SPOTIFY_CLIENT_SECRET,
    },
    auth: {
        tokenHost: 'https://accounts.spotify.com',
        authorizePath: '/authorize',
        tokenPath: '/api/token',
    },
});

exports.handler = async (event, context) => {
    const { code } = event.queryStringParameters;
    const redirectUri = 'https://fr0ntendpr0ject.netlify.app/index';
    console.log("Received code: ", code);

    try {
        const tokenParams = {
            code,
            redirect_uri: redirectUri,
        };
        // Hämta access token från Spotify
        const accessToken = await oauth2.getToken(tokenParams);
        sessionStorage.setItem("usertoken", JSON.stringify(accessToken.token.access_token));
        // Skicka tillbaka token till frontend
        return {
            statusCode: 200,
            body: JSON.stringify({
                access_token: accessToken.token.access_token,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error getting access token' }),
        };
    }
};