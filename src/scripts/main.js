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
        // 🔹 Exempel: Hämta trailer för "Naruto"
        getAnimeTrailer("Naruto");
    } catch (error) {
        console.error(error);
    }


}


async function getAnimeTrailer(animeTitle) {
    // 🔹 1. Hämta anime-ID från TMDb
    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.THEMOVIEDB_KEY}&query=${encodeURIComponent(animeTitle)}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (searchData.results.length === 0) {
        console.log("Ingen trailer hittades!");
        return;
    }

    const animeId = searchData.results[0].id; // Hämta första resultatets ID

    // 🔹 2. Hämta trailers från TMDb
    const videosUrl = `https://api.themoviedb.org/3/tv/${animeId}/videos?api_key=${TMDB_API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    // 🔹 3. Filtrera fram YouTube-trailers
    const trailers = videosData.results.filter(video => video.site === "YouTube" && video.type === "Trailer");

    if (trailers.length === 0) {
        console.log("Ingen YouTube-trailer hittades!");
        return;
    }

    const youtubeId = trailers[0].key; // Första trailern

    // 🔹 4. Visa trailern på sidan
    document.getElementById("trailerContainer").innerHTML = `
        <h3>Trailer för ${animeTitle}</h3>
        <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/${youtubeId}" 
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
        </iframe>
    `;
}

