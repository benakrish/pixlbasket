import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { AdDisplay } from '../../common/AdDisplay';
import './GameDetail.css';

// Mock game data - these will be browser-based HTML games
const gamesData = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'The classic puzzle game where you arrange falling blocks to create complete lines.',
    longDescription: 'Tetris is a classic puzzle game where players arrange falling tetrominoes (shapes composed of four square blocks) to create complete horizontal lines. When a line is completed, it disappears, and the player earns points. The game gradually speeds up as the player progresses, making it increasingly challenging. Tetris is known for its simple yet addictive gameplay that has made it one of the most recognizable video games in history.',
    image: '/placeholder-tetris.jpg',
    category: 'puzzle',
    difficulty: 'Medium',
    rating: 4.8,
    howToPlay: 'Use the arrow keys to move and rotate the falling blocks. Create complete horizontal lines to clear them from the board. The game ends when the blocks reach the top of the screen.',
    controls: [
      { key: '←/→', action: 'Move block left/right' },
      { key: '↑', action: 'Rotate block' },
      { key: '↓', action: 'Soft drop' },
      { key: 'Space', action: 'Hard drop' }
    ]
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Guide the snake to eat food and grow without hitting walls or itself.',
    longDescription: 'Snake is a classic arcade game where players control a growing snake that moves around the screen. The objective is to eat food items that appear randomly, which causes the snake to grow longer. As the snake grows, maneuvering becomes more difficult as players must avoid colliding with the snake\'s own body or the edges of the playing area. The game continues until the snake crashes, with the goal being to achieve the highest possible score.',
    image: '/placeholder-snake.jpg',
    category: 'arcade',
    difficulty: 'Easy',
    rating: 4.5,
    howToPlay: 'Control the direction of the snake to collect food. Each piece of food makes your snake grow longer. Avoid hitting the walls or your own tail.',
    controls: [
      { key: '←/→/↑/↓', action: 'Change direction' },
      { key: 'P', action: 'Pause game' }
    ]
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards.',
    longDescription: 'Memory Match is a concentration card game where all cards are laid face down and two cards are flipped face up on each turn. The objective is to turn over pairs of matching cards. If the cards match, they remain face up. If they don\'t match, they are flipped back face down. The game continues until all pairs are found. Memory Match tests and improves memory skills while providing an engaging challenge for players of all ages.',
    image: '/placeholder-memory.jpg',
    category: 'puzzle',
    difficulty: 'Easy',
    rating: 4.3,
    howToPlay: 'Click on cards to flip them over. Find all matching pairs to win. The fewer moves you make, the higher your score.',
    controls: [
      { key: 'Mouse', action: 'Click to flip cards' },
      { key: 'R', action: 'Restart game' }
    ]
  },
  {
    id: 'puzzle',
    title: 'Sliding Puzzle',
    description: 'Rearrange the tiles to complete the image.',
    longDescription: 'Sliding Puzzle is a classic game featuring a grid of numbered tiles with one tile missing. Players must rearrange the tiles by sliding them into the empty space to achieve a specific ordered configuration, usually with numbers in sequential order or to complete an image. The challenge lies in finding the optimal sequence of moves to solve the puzzle. Sliding puzzles test spatial reasoning and strategic planning skills.',
    image: '/placeholder-puzzle.jpg',
    category: 'puzzle',
    difficulty: 'Hard',
    rating: 4.2,
    howToPlay: 'Click on tiles adjacent to the empty space to move them. Arrange the tiles in numerical order or to complete the image.',
    controls: [
      { key: 'Mouse', action: 'Click to move tiles' },
      { key: 'R', action: 'Shuffle/Restart' }
    ]
  }
];

const GameDetail = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [game, setGame] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Simulate loading delay for a smoother experience
    const timer = setTimeout(() => {
      const foundGame = gamesData.find(g => g.id === gameId);
      
      if (foundGame) {
        setGame(foundGame);
        setLoading(false);
      } else {
        setError('Game not found');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [gameId]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const handleBackClick = () => {
    setIsPlaying(false);
  };

  if (loading) {
    return <LoadingSpinner fullPage text="Loading game..." />;
  }

  if (error || !game) {
    return (
      <div className="game-error container">
        <h2>Error</h2>
        <p>{error || 'Game not found'}</p>
        <Link to="/games">
          <Button>Back to Games</Button>
        </Link>
      </div>
    );
  }

  // When the user starts playing, show the game interface
  if (isPlaying) {
    return (
      <div className="game-play-container">
        <div className="game-play-header">
          <h2>{game.title}</h2>
          <Button variant="outline" onClick={handleBackClick}>Back to Details</Button>
        </div>
        
        <div className="game-canvas-container">
          {/* This is where the game would be embedded */}
          <div className="game-canvas-placeholder">
            <p>Game would load here. This is a placeholder for the actual {game.title} game.</p>
            <p>When implementing the actual game, this would be replaced with a canvas or interactive HTML elements.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show game details if not playing yet
  return (
    <div className="game-detail">
      <div className="container">
        <div className="game-header">
          <div className="game-header-content">
            <span className={`game-badge difficulty-${game.difficulty.toLowerCase()}`}>
              {game.difficulty}
            </span>
            <span className="game-badge category">{game.category}</span>
            <h1 className="game-title">{game.title}</h1>
            <div className="game-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`star ${i < Math.floor(game.rating) ? 'full' : i < game.rating ? 'half' : 'empty'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="rating-text">{game.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="game-image">
            <img src={game.image} alt={game.title} />
          </div>
        </div>

        <AdDisplay adSlot="7539514682" format="horizontal" />
        
        <div className="game-content">
          <div className="game-description">
            <h2>About the Game</h2>
            <p>{game.longDescription}</p>
          </div>
          
          <div className="game-play-section">
            <div className="game-button-container">
              <Button size="lg" onClick={handlePlayClick}>Play Now</Button>
            </div>
          </div>
          
          <div className="game-instructions">
            <h2>How to Play</h2>
            <p>{game.howToPlay}</p>
            
            <h3>Controls</h3>
            <div className="game-controls">
              {game.controls.map((control: any, index: number) => (
                <div key={index} className="control-item">
                  <span className="control-key">{control.key}</span>
                  <span className="control-action">{control.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="game-footer">
          <h2>Similar Games</h2>
          <div className="similar-games">
            {gamesData
              .filter(g => g.category === game.category && g.id !== game.id)
              .slice(0, 3)
              .map(similarGame => (
                <Link to={`/games/${similarGame.id}`} key={similarGame.id} className="similar-game">
                  <div className="similar-game-image">
                    <img src={similarGame.image} alt={similarGame.title} />
                  </div>
                  <h3>{similarGame.title}</h3>
                </Link>
              ))}
          </div>
          
          <div className="game-actions">
            <Link to="/games">
              <Button variant="outline">Back to Games</Button>
            </Link>
          </div>
        </div>
        
        <AdDisplay adSlot="8642701935" format="rectangle" />
      </div>
    </div>
  );
};

export default GameDetail;