import { Link } from 'react-router-dom';

interface ArtistCardProps {
  artist: {
    name: string;
    image: Array<{ '#text': string; size: string }>;
    listeners?: string;
  };
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  const getImageUrl = (images: Array<{ '#text': string; size: string }>, size: string) => {
    const image = images.find(img => img.size === size);
    return image ? image['#text'] : '';
  };

  const imageUrl = getImageUrl(artist.image, 'large') || 
    'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';

  const listeners = artist.listeners ? 
    Number(artist.listeners).toLocaleString() : 'N/A';

  return (
    <div className="artist-card">
      <Link to={`/music/${encodeURIComponent(artist.name)}`} className="artist-link">
        <div 
          className="artist-image" 
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="artist-info">
            <span className="artist-name">{artist.name}</span>
            <span className="artist-track">{listeners} listeners</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtistCard;