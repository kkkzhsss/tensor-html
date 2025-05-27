import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ArtistGrid from '../components/ArtistGrid';
import TrackList from '../components/TrackList';
import SectionHeader from '../components/SectionHeader';
import { getTopArtists, getTopTracks } from '../services/lastfmApi';

const Music = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [topArtists, topTracks] = await Promise.all([
          getTopArtists(12),
          getTopTracks(18)
        ]);
        setArtists(topArtists);
        setTracks(topTracks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="content">
        <h1 className="content-title">Music</h1>
        
        <SectionHeader title="Hot right now" />
        <ArtistGrid artists={artists} />
        
        <SectionHeader title="Popular tracks" />
        <TrackList tracks={tracks} columns={3} />
      </div>
      <Footer />
    </>
  );
};

export default Music;