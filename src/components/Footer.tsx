const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content-wrapper">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-column-title">COMPANY</h3>
            <ul className="footer-list">
              <li className="footer-list-item"><a href="#" className="footer-link">About Last.fm</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Contact Us</a></li>
              <li className="footer-list-item"><a href="#" className="footer-link">Jobs</a></li>
            </ul>
          </div>
          
          {/* Other footer columns... */}
          
        </div>
        
        <div className="footer-bottom">
          <div>
            <div className="language-selector">
              <span className="language-option">English</span>
              <span className="language-option">Deutsch</span>
            </div>
            <div className="time-zone">Time zone: Europe/Thorizon</div>
          </div>

          <div className="copyright">
            CBS Interactive © 2025 Last.fm Ltd. All rights reserved 
            <a href="#" className="copyright-link">Terms of Use</a> | 
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;