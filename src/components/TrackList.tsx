import TrackCard from './TrackCard';

interface TrackListProps {
  tracks: any[];
  columns?: number;
}

const TrackList = ({ tracks, columns = 1 }: TrackListProps) => {
  if (columns > 1) {
    const tracksPerColumn = Math.ceil(tracks.length / columns);
    return (
      <div className="tracks-container">
        {Array.from({ length: columns }).map((_, colIndex) => {
          const start = colIndex * tracksPerColumn;
          const end = start + tracksPerColumn;
          const columnTracks = tracks.slice(start, end);
          
          return (
            <div key={colIndex} className="track-column">
              {columnTracks.map((track, index) => (
                <TrackCard key={index} track={track} />
              ))}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="tracks-list">
      {tracks.map((track, index) => (
        <TrackCard key={index} track={track} />
      ))}
    </div>
  );
};

export default TrackList;