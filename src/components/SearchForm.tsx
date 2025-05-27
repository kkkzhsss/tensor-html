import { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchFormProps {
  initialQuery?: string;
}

const SearchForm = ({ initialQuery = "" }: SearchFormProps) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form id="searchForm" onSubmit={handleSubmit}>
      <input
        type="text"
        id="searchInput"
        name="q"
        placeholder="Search artists, tracks..."
        aria-label="Search for artists, tracks or albums"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-toggle-icon" type="submit" aria-label="Search">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png" 
          alt="Search" 
          width={16} 
          height={16} 
        />
      </button>
    </form>
  );
};

export default SearchForm;
