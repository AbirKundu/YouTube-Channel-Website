const API_KEY = 'AIzaSyCEfrZhdv9FIld-QN33tZ_V7pILnyDPBII';
const CHANNEL_ID = 'UCq8wjoYOG_hh6LBzOHG2hEw';

function fetchPlaylists() {
    const categorySection = document.getElementById('category-list');
    categorySection.innerHTML = "<h2>Playlists</h2>";  // Title for the playlists section
    
    const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&key=${API_KEY}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const playlists = data.items;
            
            // Render the playlists inside grid cells
            playlists.forEach(playlist => {
                const title = playlist.snippet.title;
                const thumbnail = playlist.snippet.thumbnails.medium.url;
                const playlistId = playlist.id;
                const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;
                
                categorySection.innerHTML += `
                    <div class="playlist-card">
                        <img src="${thumbnail}" alt="${title}">
                        <h4>${title}</h4>
                        <a href="${playlistUrl}" target="_blank">View Playlist</a>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error fetching playlists:', error));
}

// Call fetchPlaylists when the page is loaded
window.onload = fetchPlaylists;
