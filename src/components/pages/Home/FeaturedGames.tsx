import { Link } from 'react-router-dom';
import { Card, CardImage, CardContent, CardTitle, CardFooter } from '../../common/Card';
import { Button } from '../../common/Button';
import './FeaturedGames.css';

// Mock data for featured games
const featuredGames = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'The classic puzzle game where you arrange falling blocks.',
    image: '/placeholder-tetris.jpg',
    difficulty: 'Medium'
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Guide the snake to eat food and grow without hitting walls or itself.',
    image: '/placeholder-snake.jpg',
    difficulty: 'Easy'
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards.',
    image: '/placeholder-memory.jpg',
    difficulty: 'Easy'
  },
  {
    id: 'puzzle',
    title: 'Sliding Puzzle',
    description: 'Rearrange the tiles to complete the image.',
    image: '/placeholder-puzzle.jpg',
    difficulty: 'Hard'
  }
];

export const FeaturedGames = () => {
  return (
    <section className="featured-games">
      <div className="container">
        <h2 className="section-title">Featured Games</h2>
        <p className="section-description">
          Check out our most popular games. Challenge yourself and have fun!
        </p>
        
        <div className="games-grid">
          {featuredGames.map((game) => (
            <Card key={game.id} hoverable>
              <CardImage 
                src={game.image} 
                alt={`${game.title} game`} 
              />
              <CardContent>
                <CardTitle>{game.title}</CardTitle>
                <p>{game.description}</p>
                <div className="game-difficulty">
                  <span className={`difficulty-badge difficulty-${game.difficulty.toLowerCase()}`}>
                    {game.difficulty}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/games/${game.id}`}>
                  <Button variant="primary">Play Now</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="view-all-container">
          <Link to="/games">
            <Button variant="outline">View All Games</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
