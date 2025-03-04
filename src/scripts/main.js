const testBTN = document.getElementById("test");

testBTN.addEventListener("click", playTrack);


async function playTrack() {
    try {
        const resp = await fetch("https://api.spotify.com/v1/search?q=Naruto&type=track", {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('spotify_access_token')}` }
        });
        const data = await resp.json();
        const track = data.tracks.items[0];

        document.getElementById("spotifyPlayer").innerHTML = `
        <h3>${track.name} - ${track.artists[0].name}</h3>
        <iframe src="https://open.spotify.com/embed/track/${track.id}" width="300" height="80" frameborder="0"></iframe>
    `;
    } catch (error) {
        console.error(error);
    }


}