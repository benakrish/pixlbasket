import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../common/Button';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import { AdDisplay } from '../../common/AdDisplay';
import Chess from '../../games/Chess';
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
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Navigate through a maze while chomping on dots and avoiding ghosts.',
    longDescription: 'Pac-Man is an iconic arcade game where players control the titular character through a maze, eating dots while avoiding four colored ghosts. Power pellets temporarily allow Pac-Man to eat the ghosts for bonus points. The maze contains various pathways and tunnels that can be used strategically to evade pursuers. As levels progress, the ghosts become faster and more aggressive, increasing the challenge.',
    image: '/placeholder-pacman.jpg',
    category: 'arcade',
    difficulty: 'Medium',
    rating: 4.9,
    howToPlay: 'Navigate Pac-Man through the maze to eat all the dots. Avoid the ghosts unless you\'ve eaten a power pellet, which allows you to eat the ghosts temporarily.',
    controls: [
      { key: '←/→/↑/↓', action: 'Move Pac-Man' },
      { key: 'P', action: 'Pause game' }
    ]
  },
  {
    id: 'chess',
    title: 'Chess',
    description: 'The classic strategy board game of kings and queens.',
    longDescription: 'Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid. Each player begins with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns. The objective is to checkmate the opponent\'s king, whereby the king is under immediate attack (in "check") and there is no way for it to escape. Chess requires deep strategic thinking, foresight, and an understanding of complex positional concepts.',
    image: '/placeholder-chess.jpg',
    category: 'strategy',
    difficulty: 'Hard',
    rating: 4.7,
    howToPlay: 'Move your pieces according to their specific movement rules. Capture enemy pieces by moving onto their square. Checkmate your opponent\'s king to win.',
    controls: [
      { key: 'Mouse', action: 'Select and move pieces' },
      { key: 'U', action: 'Undo move' }
    ]
  },
  {
    id: 'solitaire',
    title: 'Solitaire',
    description: 'The popular single-player card game to test your patience and strategy.',
    longDescription: 'Solitaire (also known as Klondike) is a single-player card game where the objective is to sort a standard 52-card deck into four foundation piles, one for each suit, arranged in ascending order from Ace to King. Players must strategically move cards between the tableau piles following specific rules. The game tests planning ability, patience, and strategic thinking. Despite its simple rules, Solitaire offers complex gameplay with many games being unsolvable, adding to its enduring challenge.',
    image: '/placeholder-solitaire.jpg',
    category: 'card',
    difficulty: 'Medium',
    rating: 4.4,
    howToPlay: 'Build four foundation piles in ascending order from Ace to King, sorted by suit. Move cards in the tableau in descending order with alternating colors.',
    controls: [
      { key: 'Mouse', action: 'Move cards' },
      { key: 'Double-click', action: 'Auto-move to foundation' }
    ]
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Clear the board without detonating any mines using clues about neighboring mines.',
    longDescription: 'Minesweeper is a logic puzzle game where players clear a rectangular board containing hidden mines without detonating any of them. The board is divided into cells, which have three states: uncovered, covered, and flagged. A covered cell is blank and clickable, while an uncovered cell either contains a number (indicating the number of mines adjacent to it) or is blank (indicating there are no mines adjacent to it). The player uses the numbers as clues to deduce where the mines are and safely clear the board.',
    image: '/placeholder-minesweeper.jpg',
    category: 'puzzle',
    difficulty: 'Medium',
    rating: 4.1,
    howToPlay: 'Left-click to reveal a cell. Right-click to flag a suspected mine. Numbers indicate how many mines are adjacent to that cell. Use logic to determine which cells are safe to click.',
    controls: [
      { key: 'Left-click', action: 'Reveal cell' },
      { key: 'Right-click', action: 'Flag/unflag cell' }
    ]
  },
  {
    id: 'hangman',
    title: 'Hangman',
    description: 'Guess the word one letter at a time before the hangman is complete.',
    longDescription: 'Hangman is a word-guessing game where one player thinks of a word and the other tries to guess it by suggesting letters. Each incorrect guess results in drawing a part of a hangman figure. The game ends when the word is guessed correctly or when the hangman figure is completed. Hangman helps build vocabulary and spelling skills while providing a fun challenge for players of all ages.',
    image: '/placeholder-hangman.jpg',
    category: 'word',
    difficulty: 'Easy',
    rating: 4.0,
    howToPlay: 'Guess letters to complete the hidden word. Each wrong guess adds a part to the hangman. Guess the word before the hangman is complete to win.',
    controls: [
      { key: 'Keyboard', action: 'Type letters to guess' },
      { key: 'Enter', action: 'Submit guess' }
    ]
  },
  {
    id: 'sudoku',
    title: 'Sudoku',
    description: 'Fill the 9×9 grid with digits so each column, row, and 3×3 section contain numbers 1-9.',
    longDescription: 'Sudoku is a logic-based number placement puzzle. The objective is to fill a 9×9 grid with digits so that each column, each row, and each of the nine 3×3 subgrids contains all of the digits from 1 to 9. The puzzle setter provides a partially completed grid, which has a unique solution. Sudoku requires logical thinking and deduction, making it an excellent exercise for the mind.',
    image: '/placeholder-sudoku.jpg',
    category: 'puzzle',
    difficulty: 'Medium',
    rating: 4.6,
    howToPlay: 'Fill each empty cell with a number from 1-9. Each row, column, and 3x3 box must contain all numbers from 1-9 without repetition.',
    controls: [
      { key: 'Mouse', action: 'Select cell' },
      { key: 'Number keys', action: 'Enter a number' },
      { key: 'Del/Backspace', action: 'Clear a cell' }
    ]
  },
  {
    id: 'breakout',
    title: 'Breakout',
    description: 'Destroy all the bricks with a bouncing ball and a paddle.',
    longDescription: 'Breakout is an arcade game where a layer of bricks is arranged at the top of the screen, and the player must use a paddle to bounce a ball against the bricks to destroy them. The objective is to eliminate all bricks without letting the ball fall below the paddle. As the game progresses, the ball moves faster, and the paddle may shrink, increasing the challenge. Breakout requires quick reflexes and spatial awareness.',
    image: '/placeholder-breakout.jpg',
    category: 'arcade',
    difficulty: 'Medium',
    rating: 4.3,
    howToPlay: 'Move the paddle to bounce the ball and break all the bricks. Don\'t let the ball fall off the bottom of the screen.',
    controls: [
      { key: '←/→', action: 'Move paddle left/right' },
      { key: 'Space', action: 'Launch ball/Pause game' }
    ]
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    description: 'Classic game of X\'s and O\'s. Get three in a row to win.',
    longDescription: 'Tic Tac Toe is a paper-and-pencil game for two players who take turns marking X or O in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. It\'s a solved game, with a forced draw assuming best play from both players. Despite its simplicity, Tic Tac Toe provides an accessible introduction to basic concepts of game theory and strategic thinking.',
    image: '/placeholder-tictactoe.jpg',
    category: 'strategy',
    difficulty: 'Easy',
    rating: 4.0,
    howToPlay: 'Take turns placing X or O on the 3x3 grid. Get three of your symbols in a row (horizontally, vertically, or diagonally) to win.',
    controls: [
      { key: 'Mouse', action: 'Place X or O' },
      { key: 'R', action: 'Restart game' }
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
          {gameId === 'chess' ? (
            <Chess onBackToDetails={handleBackClick} />
          ) : (
            // Placeholder for other games
            <div className="game-canvas-placeholder">
              <p>Game would load here. This is a placeholder for the actual {game.title} game.</p>
              <p>When implementing the actual game, this would be replaced with a canvas or interactive HTML elements.</p>
            </div>
          )}
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