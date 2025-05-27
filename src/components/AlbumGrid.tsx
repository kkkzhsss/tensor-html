import AlbumCard from './AlbumCard';

interface AlbumGridProps {
  albums: any[];
}

const AlbumGrid = ({ albums }: AlbumGridProps) => {
  return (
    <div className="albums-grid">
      {albums.map((album, index) => (
        <AlbumCard key={index} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;