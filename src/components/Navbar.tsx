import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links left-links"></div>
      <Link to="/" className="logo">Last.fm</Link>
      <div className="nav-links right-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="#" className="nav-link">Live</Link>
        <Link to="/music" className="nav-link">Music</Link>
        <Link to="#" className="nav-link">Charts</Link>
        <Link to="#" className="nav-link">Events</Link>
        <SearchForm />
      </div>
    </nav>
  );
};

export default Navbar;