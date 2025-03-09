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
            <li><a href="/">Home</a></li>
            <li><a href="/games">Games</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Popular Games</h4>
          <ul className="footer-links">
            <li><a href="/games/tetris">Tetris</a></li>
            <li><a href="/games/snake">Snake</a></li>
            <li><a href="/games/memory">Memory Match</a></li>
            <li><a href="/games/puzzle">Puzzle</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <ul className="footer-links">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
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
