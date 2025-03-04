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
  const redirectUri = 'https://fr0ntendpr0ject.netlify.app/auth';
  const authorizationUri = oauth2.authorizeURL({
    redirect_uri: redirectUri,
    scope: 'user-library-read user-read-playback-state user-read-currently-playing streaming',
    state: 'someRandomState', // Säkerhetsparameter för att skydda mot CSRF
  });

  return {
    statusCode: 302,
    headers: {
      Location: authorizationUri,
    },
  };
};