const apiKey = 'f50ea622593ee9393f5b1b9d73c9b9d5';
const params = new URLSearchParams(window.location.search);
const query = params.get('q');

const artistsGrid = document.querySelector('.artists-grid');
const albumsGrid = document.querySelector('.albums-grid');
const tracksGrid = document.querySelector('.tracks-list');
const searchResult = document.querySelector('#search-results-title');

searchResult.textContent = `Search results for "${query}"`;

async function fetchArtists(artistName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json&limit=8`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.artistmatches.artist || [];
  } catch (error) {
    console.error('Ошибка при запросе артистов:', error);
    return [];
  }
}

async function fetchAlbums(albumName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(albumName)}&api_key=${apiKey}&format=json&limit=8`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results.albummatches.album || [];
  } catch (error) {
    console.error('Ошибка при запросе альбомов:', error);
    return [];
  }
}

async function fetchTracks(trackName) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(trackName)}&api_key=${apiKey}&format=json&limit=8`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    let tracks = data.results.trackmatches.track;
    if (!tracks) return [];
    if (!Array.isArray(tracks)) {
      tracks = [tracks];
    }
    return tracks;
  } catch (error) {
    console.error('Ошибка при запросе треков:', error);
    return [];
  }
}

function createArtistCard(artist) {
  const imageObj = artist.image.find(img => img.size === 'large');
  const imageUrl = imageObj && imageObj['#text'] ? imageObj['#text'] : '';

  const listeners = artist.listeners ? artist.listeners : 'N/A';
  const listenersFormatted = listeners !== 'N/A' ? Number(listeners).toLocaleString() : 'N/A';

  const card = document.createElement('div');
  card.className = 'artist-card';

  card.innerHTML = `
   <div class="artist-image" style="background-image: url('${imageUrl ? imageUrl : 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'}'); background-size: cover; background-position: center;">
    <div class="artist-info">
      <span class="artist-name">${artist.name}</span>
      <span class="artist-track">${listenersFormatted} listeners</span>
    </div>
  </div>
 `;

  return card;
}


function createAlbumCard(album) {
  const imageObj = album.image.find(img => img.size === 'large');
  const imageUrl = imageObj && imageObj['#text'] ? imageObj['#text'] : '';

  const card = document.createElement('div');
  card.className = 'artist-card'; 

  card.innerHTML = `
    <div class="artist-image" style="background-image: url('${imageUrl ? imageUrl : 'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png'}'); background-size: cover; background-position: center;">
        <div class="artist-info">
        <span class="artist-name">${album.name}</span>
        <span class="artist-track">${album.artist}</span>
        </div>
    </div>
    `;

  return card;
}

function formatDuration(ms) {
  if (!ms) return '';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function createTrackCard(track) {
  const imageObj = track.image?.find(img => img.size === 'large');
  const imageUrl = imageObj && imageObj['#text'] ? imageObj['#text'] : '';

  const durationMs = Number(track.duration) || 0;
  const durationFormatted = formatDuration(durationMs);

  const card = document.createElement('div');
  card.className = 'track-card';

  card.innerHTML = `
    <div class="track-image" style="background-image: url('${imageUrl}');"></div>
    <div class="track-info">
      <span class="track-name">${track.name}</span>
      <span class="track-artist">${track.artist}</span>
    </div>
    <div class="track-duration" style="margin-left: auto; font-size: 12px; color: #999; white-space: nowrap;">
      ${durationFormatted}
    </div>
  `;

  card.style.display = 'flex';
  card.style.alignItems = 'center';
  card.style.gap = '10px';

  return card;
}

async function displayArtists() {
  if (!artistsGrid) return;
  if (!query) {
    artistsGrid.innerHTML = '<p>Введите имя артиста для поиска.</p>';
    return;
  }

  const artists = await fetchArtists(query);
  artistsGrid.innerHTML = '';

  if (artists.length === 0) {
    artistsGrid.innerHTML = '<p>Артисты не найдены.</p>';
    return;
  }

  artists.forEach(artist => {
    const card = createArtistCard(artist);
    artistsGrid.appendChild(card);
  });
}

async function displayAlbums() {
  if (!albumsGrid) return;
  if (!query) {
    albumsGrid.innerHTML = '<p>Введите название альбома для поиска.</p>';
    return;
  }

  const albums = await fetchAlbums(query);
  albumsGrid.innerHTML = '';

  if (albums.length === 0) {
    albumsGrid.innerHTML = '<p>Альбомы не найдены.</p>';
    return;
  }

  albums.forEach(album => {
    const card = createAlbumCard(album);
    albumsGrid.appendChild(card);
  });
}

async function displayTracks() {
  if (!tracksGrid) return;
  if (!query) {
    tracksGrid.innerHTML = '<p>Введите название трека для поиска.</p>';
    return;
  }

  const tracks = await fetchTracks(query);
  tracksGrid.innerHTML = '';

  if (tracks.length === 0) {
    tracksGrid.innerHTML = '<p>Треки не найдены.</p>';
    return;
  }

  tracks.forEach(track => {
    const card = createTrackCard(track);
    tracksGrid.appendChild(card);
  });
}

displayArtists();
displayAlbums();
displayTracks();
