window.onload = async () => {
    try {
        const response = await fetch('/.netlify/functions/callback');
        const data = await response.json();

        sessionStorage.setItem("usertoken", JSON.stringify(data.access_token));
    } catch(error) {
        console.error(error);
    }
}