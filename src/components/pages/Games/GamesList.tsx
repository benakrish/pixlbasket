import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GameCard } from './GameCard';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import './GamesList.css';

// Mock data for games
const allGames = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'The classic puzzle game where you arrange falling blocks.',
    image: '/placeholder-tetris.jpg',
    category: 'puzzle',
    difficulty: 'Medium',
    rating: 4.8
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Guide the snake to eat food and grow without hitting walls or itself.',
    image: '/placeholder-snake.jpg',
    category: 'arcade',
    difficulty: 'Easy',
    rating: 4.5
  },
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards.',
    image: '/placeholder-memory.jpg',
    category: 'puzzle',
    difficulty: 'Easy',
    rating: 4.3
  },
  {
    id: 'puzzle',
    title: 'Sliding Puzzle',
    description: 'Rearrange the tiles to complete the image.',
    image: '/placeholder-puzzle.jpg',
    category: 'puzzle',
    difficulty: 'Hard',
    rating: 4.2
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Navigate through a maze while chomping on dots and avoiding ghosts.',
    image: '/placeholder-pacman.jpg',
    category: 'arcade',
    difficulty: 'Medium',
    rating: 4.9
  },
  {
    id: 'chess',
    title: 'Chess',
    description: 'The classic strategy board game of kings and queens.',
    image: '/placeholder-chess.jpg',
    category: 'strategy',
    difficulty: 'Hard',
    rating: 4.7
  },
  {
    id: 'solitaire',
    title: 'Solitaire',
    description: 'The popular single-player card game to test your patience and strategy.',
    image: '/placeholder-solitaire.jpg',
    category: 'card',
    difficulty: 'Medium',
    rating: 4.4
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    description: 'Clear the board without detonating any mines using clues about neighboring mines.',
    image: '/placeholder-minesweeper.jpg',
    category: 'puzzle',
    difficulty: 'Medium',
    rating: 4.1
  }
];

interface GamesListProps {
  category: string;
  searchQuery: string;
}

export const GamesList = ({ category, searchQuery }: GamesListProps) => {
  const [games, setGames] = useState(allGames);
  const [loading, setLoading] = useState(true);

  // Filter games based on category and search query
  useEffect(() => {
    setLoading(true);

    // Simulate API request delay
    const timer = setTimeout(() => {
      let filteredGames = [...allGames];

      // Filter by category
      if (category !== 'all') {
        filteredGames = filteredGames.filter(game => game.category === category);
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredGames = filteredGames.filter(game => 
          game.title.toLowerCase().includes(query) || 
          game.description.toLowerCase().includes(query)
        );
      }

      setGames(filteredGames);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category, searchQuery]);

  if (loading) {
    return <LoadingSpinner text="Loading games..." />;
  }

  if (games.length === 0) {
    return (
      <div className="games-empty">
        <p>No games found. Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="games-list">
      {games.map(game => (
        <Link key={game.id} to={`/games/${game.id}`} className="game-link">
          <GameCard game={game} />
        </Link>
      ))}
    </div>
  );
};