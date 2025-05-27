import { Link } from 'react-router-dom';

interface TrackCardProps {
  track: {
    name: string;
    artist: {
      name?: string;
      '#text'?: string;
    };
    image?: Array<{ '#text': string; size: string }>;
    duration?: string;
  };
}

const TrackCard = ({ track }: TrackCardProps) => {
  const getImageUrl = (images: Array<{ '#text': string; size: string }> = [], size: string) => {
    const image = images.find(img => img.size === size);
    return image ? image['#text'] : '';
  };

  const artistName = track.artist?.name || track.artist?.['#text'] || 'Unknown Artist';
  const imageUrl = getImageUrl(track.image || [], 'medium') || 
    'https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png';

  const formatDuration = (duration: string | undefined) => {
    if (!duration) return '3:32';
    const seconds = Math.floor(Number(duration) / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Link 
      to={`/music/${encodeURIComponent(artistName)}/_/${encodeURIComponent(track.name)}`}
      className="track"
    >
      <div 
        className="album-cover" 
        style={{ backgroundImage: `url('${imageUrl}')` }}
      ></div>
      <div className="track-info">
        <div className="track-name">{track.name}</div>
        <div className="track-artist">{artistName}</div>
        {track.duration && (
          <div className="track-duration">{formatDuration(track.duration)}</div>
        )}
      </div>
    </Link>
  );
};

export default TrackCard;