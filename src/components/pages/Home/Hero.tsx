import { Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import './Hero.css';

export const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Play Fun Games Online</h1>
          <p className="hero-description">
            Welcome to PixlBasket, your destination for fun browser-based games. Challenge yourself, beat high scores, and compete with friends!
          </p>
          <div className="hero-buttons">
            <Link to="/games">
              <Button size="lg">Browse Games</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <div className="game-controller-icon">🎮</div>
          </div>
        </div>
      </div>
    </section>
  );
};
