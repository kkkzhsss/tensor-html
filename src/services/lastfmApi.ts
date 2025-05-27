const API_KEY = 'f50ea622593ee9393f5b1b9d73c9b9d5';

export const getTopArtists = async (limit: number = 12) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}`
  );
  const data = await response.json();
  return data?.artists?.artist || [];
};

export const getTopTracks = async (limit: number = 18) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}`
  );
  const data = await response.json();
  return data?.tracks?.track || [];
};

export const searchArtists = async (query: string, limit: number = 8) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  );
  const data = await response.json();
  return data?.results?.artistmatches?.artist || [];
};

export const searchAlbums = async (query: string, limit: number = 8) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  );
  const data = await response.json();
  return data?.results?.albummatches?.album || [];
};

export const searchTracks = async (query: string, limit: number = 8) => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=${limit}`
  );
  const data = await response.json();
  const tracks = data?.results?.trackmatches?.track || [];
  return Array.isArray(tracks) ? tracks : [tracks];
};