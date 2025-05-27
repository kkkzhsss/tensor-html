import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArtistGrid from '../components/ArtistGrid';
import AlbumGrid from '../components/AlbumGrid';
import TrackList from '../components/TrackList';
import SectionHeader from '../components/SectionHeader';
import SearchForm from '../components/SearchForm';
import { searchArtists, searchAlbums, searchTracks } from '../services/lastfmApi';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';
  
  const [artists, setArtists] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const [artistResults, albumResults, trackResults] = await Promise.all([
          searchArtists(query, 8),
          searchAlbums(query, 8),
          searchTracks(query, 8)
        ]);
        
        setArtists(artistResults);
        setAlbums(albumResults);
        setTracks(trackResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="search-container">
        <div className="search-header">
          <h1 id="search-results-title">Search results for "{query}"</h1>
          <div className="new-search-container">
            <SearchForm initialQuery={query} />
          </div>
        </div>
        
        <div className="main-content-wrapper">
          {artists.length > 0 && (
            <div className="search-section">
              <SectionHeader title="Artists" />
              <ArtistGrid artists={artists} />
            </div>
          )}
          
          {albums.length > 0 && (
            <div className="search-section">
              <SectionHeader title="Albums" />
              <AlbumGrid albums={albums} />
            </div>
          )}
          
          {tracks.length > 0 && (
            <div className="search-section">
              <SectionHeader title="Tracks" />
              <TrackList tracks={tracks} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Search;