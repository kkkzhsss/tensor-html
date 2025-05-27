import ArtistCard from './ArtistCard';

interface ArtistGridProps {
  artists: any[];
}

const ArtistGrid = ({ artists }: ArtistGridProps) => {
  return (
    <div className="artists-container">
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  );
};

export default ArtistGrid;