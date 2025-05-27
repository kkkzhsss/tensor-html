// api.js
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация поиска
    initSearch();
    
    // Загрузка популярных артистов и треков на главной странице
    if (document.querySelector('.artists-container')) {
        loadPopularArtists();
        loadPopularTracks();
    }
    
    // Обработка поиска на странице search.html
    if (window.location.pathname.includes('search.html')) {
        handleSearch();
    }
});

// Update the initSearch function to use the properly named field
function initSearch() {
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.elements.q.value.trim(); // Using name attribute
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Обработка поиска на странице результатов
    const newSearchInput = document.querySelector('.new-search-input');
    const newSearchButton = document.querySelector('.new-search-button');
    
    if (newSearchInput) {
        newSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const query = this.value.trim();
                if (query) {
                    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    
    if (newSearchButton) {
        newSearchButton.addEventListener('click', function() {
            const query = document.querySelector('.new-search-input').value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}


async function handleSearch() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        document.getElementById('search-results-title').textContent = `Search results for "${query}"`;
        document.querySelector('.new-search-input').value = query;
        
        try {
            showLoadingIndicator();
            
            // Ищем артистов, альбомы и треки
            const [artists, albums, tracks] = await Promise.all([
                searchArtists(query),
                searchAlbums(query),
                searchTracks(query)
            ]);
            
            displaySearchResults(artists, albums, tracks);
            
        } catch (error) {
            console.error('Error fetching search results:', error);
            showError('Failed to load search results. Please try again later.');
        } finally {
            hideLoadingIndicator();
        }
    }
}


async function searchArtists(query) {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(query)}&api_key=f50ea622593ee9393f5b1b9d73c9b9d5&format=json&limit=8`);
    const data = await response.json();
    return data?.results?.artistmatches?.artist || [];
}

async function searchAlbums(query) {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&api_key=f50ea622593ee9393f5b1b9d73c9b9d5&format=json&limit=8`);
    const data = await response.json();
    return data?.results?.albummatches?.album || [];
}

async function searchTracks(query) {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&api_key=f50ea622593ee9393f5b1b9d73c9b9d5&format=json&limit=8`);
    const data = await response.json();
    return data?.results?.trackmatches?.track || [];
}


function displaySearchResults(artists, albums, tracks) {
    displaySearchArtists(artists);
    displaySearchAlbums(albums);
    displaySearchTracks(tracks);
    
    // Показываем "Not found" если нет результатов
    const sections = [
        { element: document.querySelector('.artists-grid'), items: artists, type: 'artists' },
        { element: document.querySelector('.albums-grid'), items: albums, type: 'albums' },
        { element: document.querySelector('.tracks-list'), items: tracks, type: 'tracks' }
    ];
    
    sections.forEach(section => {
        if (section.items.length === 0) {
            section.element.innerHTML = `<div class="not-found">No ${section.type} found</div>`;
        }
    });
}

function displaySearchArtists(artists) {
    const grid = document.querySelector('.artists-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.className = 'artist-card';
        artistElement.innerHTML = `
            <a href="https://www.last.fm/music/${encodeURIComponent(artist.name)}" class="artist-link">
                <div class="artist-image" style="background-image: url(${getImageUrl(artist.image, 'extralarge')})">
                    <div class="artist-info">
                        <span class="artist-name">${artist.name}</span>
                        <span class="artist-track">Artist</span>
                    </div>
                </div>
            </a>
        `;
        grid.appendChild(artistElement);
    });
}


function displaySearchAlbums(albums) {
    const grid = document.querySelector('.albums-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    albums.forEach(album => {
        const albumElement = document.createElement('div');
        albumElement.className = 'album-card';
        albumElement.innerHTML = `
            <a href="https://www.last.fm/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}" class="album-link">
                <div class="album-image" style="background-image: url(${getImageUrl(album.image, 'extralarge')})">
                    <div class="album-info">
                        <span class="album-name">${album.name}</span>
                        <span class="album-artist">${album.artist}</span>
                    </div>
                </div>
            </a>
        `;
        grid.appendChild(albumElement);
    });
}


function displaySearchTracks(tracks) {
    const list = document.querySelector('.tracks-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.className = 'track';
        trackElement.innerHTML = `
            <a href="https://www.last.fm/music/${encodeURIComponent(track.artist)}/_/${encodeURIComponent(track.name)}" class="track-link">
                <div class="track-image" style="background-image: url(${getImageUrl(track.image, 'medium')})"></div>
                <div class="track-info">
                    <span class="track-name">${track.name}</span>
                    <span class="track-artist">${track.artist}</span>
                </div>
                <div class="track-duration">${track.duration || "3:32"}</div>
            </a>
        `;
        list.appendChild(trackElement);
    });
}


// Вспомогательные функции
function getImageUrl(images, size) {
    if (!images) return '';
    const image = images.find(img => img.size === size);
    return image ? image['#text'] : '';
}

// Вспомогательные функции
function getImageUrl(images, size) {
    if (!images) return '';
    const image = images.find(img => img.size === size);
    return image ? image['#text'] : '';
}

function showLoadingIndicator() {
    const loading = document.createElement('div');
    loading.className = 'loading-indicator';
    loading.innerHTML = 'Loading...';
    document.querySelector('.search-results').prepend(loading);
}

function hideLoadingIndicator() {
    const loading = document.querySelector('.loading-indicator');
    if (loading) loading.remove();
}

function showError(message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    document.querySelector('.search-results').prepend(error);
}

// Функции для главной страницы
async function loadPopularArtists() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=f50ea622593ee9393f5b1b9d73c9b9d5&format=json&limit=12`);
        const data = await response.json();
        
        if (data?.artists?.artist) {
            displayArtists(data.artists.artist);
        }
    } catch (error) {
        console.error('Error fetching popular artists:', error);
    }
}

function displayArtists(artists) {
    const container = document.querySelector('.artists-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    artists.forEach(artist => {
        const artistElement = document.createElement('div');
        artistElement.className = 'artist-circle';
        artistElement.innerHTML = `
            <a href="https://www.last.fm/music/${encodeURIComponent(artist.name)}" class="artist-link">
                <div class="artist-circle-image" style="background-image: url(${getImageUrl(artist.image, 'large')})"></div>
                <div class="artist-name">${artist.name}</div>
                <div class="artist-desc">Popular artist</div>
            </a>
        `;
        container.appendChild(artistElement);
    });
}

async function loadPopularTracks() {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=f50ea622593ee9393f5b1b9d73c9b9d5&format=json&limit=18`);
        const data = await response.json();
        
        if (data?.tracks?.track) {
            displayPopularTracks(data.tracks.track);
        }
    } catch (error) {
        console.error('Error fetching popular tracks:', error);
    }
}

function displayPopularTracks(tracks) {
    const container = document.querySelector('.tracks-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const tracksPerColumn = Math.ceil(tracks.length / 3);
    
    for (let i = 0; i < 3; i++) {
        const column = document.createElement('div');
        column.className = 'track-column';
        
        const startIdx = i * tracksPerColumn;
        const endIdx = startIdx + tracksPerColumn;
        const columnTracks = tracks.slice(startIdx, endIdx);
        
        columnTracks.forEach(track => {
            const trackElement = document.createElement('a');
            trackElement.className = 'track';
            trackElement.href = `https://www.last.fm/music/${encodeURIComponent(track.artist.name)}/_/${encodeURIComponent(track.name)}`;
            trackElement.target = '_blank';
            trackElement.innerHTML = `
                <div class="album-cover" style="background-image: url(${getImageUrl(track.image, 'medium')})"></div>
                <div class="track-info">
                    <div class="track-name">${track.name}</div>
                    <div class="track-artist">${track.artist.name}</div>
                    <div class="track-genre">Popular track</div>
                </div>
            `;
            column.appendChild(trackElement);
        });
        
        container.appendChild(column);
    }
}