import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3 className="footer-title">PixlBasket</h3>
          <p className="footer-description">
            The ultimate place to play fun browser games and challenge your friends.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/games">Games</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Popular Games</h4>
          <ul className="footer-links">
            <li><Link to="/games/tetris">Tetris</Link></li>
            <li><Link to="/games/snake">Snake</Link></li>
            <li><Link to="/games/memory">Memory Match</Link></li>
            <li><Link to="/games/puzzle">Puzzle</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <ul className="footer-links">
            <li><a href="https://discord.gg/dXhxkq7V9x" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://github.com/benakrish/pixlbasket" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {currentYear} PixlBasket. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};