import { Link } from 'react-router-dom';

interface AlbumCardProps {
  album: {
    name: string;
    artist: string;
    image: Array<{ '#text': string; size: string }>;
  };
}

const AlbumCard = ({ album }: AlbumCardProps) => {
  const getImageUrl = (images: Array<{ '#text': string; size: string }>, size: string) => {
    const image = images.find(img => img.size === size);
    return image ? image['#text'] : '';
  };

  const imageUrl = getImageUrl(album.image, 'large') || 
    'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';

  return (
    <div className="album-card">
      <Link 
        to={`/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`} 
        className="album-link"
      >
        <div 
          className="album-image" 
          style={{ backgroundImage: `url('${imageUrl}')` }}
        >
          <div className="album-info">
            <span className="album-name">{album.name}</span>
            <span className="album-artist">{album.artist}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;