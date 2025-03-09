import { Card, CardImage, CardContent, CardTitle } from '../../common/Card';
import './GameCard.css';

interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: string;
  rating: number;
}

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  // Generate stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full-star">★</span>);
    }

    // Half star if needed
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">★</span>);
    }

    // Empty stars to always have 5 stars total
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star">★</span>);
    }

    return stars;
  };

  return (
    <Card hoverable className="game-card">
      <CardImage 
        src={game.image} 
        alt={`${game.title} game`}
      />
      <div className="game-category">
        <span className="category-tag">{game.category}</span>
      </div>
      <CardContent>
        <CardTitle>{game.title}</CardTitle>
        <p className="game-description">{game.description}</p>
        <div className="game-meta">
          <div className="game-difficulty">
            <span className={`difficulty-badge difficulty-${game.difficulty.toLowerCase()}`}>
              {game.difficulty}
            </span>
          </div>
          <div className="game-rating">
            <div className="stars-container">
              {renderStars(game.rating)}
            </div>
            <span className="rating-value">{game.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
