import { useState } from 'react';
import { GamesList } from './GamesList';
import './Games.css';

// Mock categories for filtering
const categories = [
  { id: 'all', name: 'All Games' },
  { id: 'puzzle', name: 'Puzzle' },
  { id: 'arcade', name: 'Arcade' },
  { id: 'strategy', name: 'Strategy' },
  { id: 'card', name: 'Card Games' }
];

const Games = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="games-page">
      <div className="container">
        <header className="games-header">
          <h1 className="games-title">Games Library</h1>
          <p className="games-description">
            Browse our collection of fun browser games. Find your favorite and start playing!
          </p>
        </header>

        <div className="games-filters">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="search-filter">
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
        </div>

        <GamesList 
          category={selectedCategory} 
          searchQuery={searchQuery} 
        />
      </div>
    </div>
  );
};

export default Games;
