const testBTN = document.getElementById("test");

testBTN.addEventListener("click", playTrack);


async function playTrack() {
    fetch('https://api.spotify.com/v1/search?q=Naruto&type=track', {
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('spotify_access_token')
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
}