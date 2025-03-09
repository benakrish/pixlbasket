# GameHub Games

This directory contains the implementation of all browser-based games for GameHub.

## Adding a New Game

To add a new game to GameHub, follow these steps:

1. Create a new component file with the game's name (e.g., `Snake.tsx`, `Tetris.tsx`).
2. Create a corresponding CSS file for styling.
3. Implement the game logic and UI in the component.
4. Update the `gamesData` array in `GameDetail.tsx` to include information about your game.
5. Update the conditional rendering in `GameDetail.tsx` to include your game component.

## Game Component Guidelines

Each game component should:

- Accept a `onBackToDetails` prop that allows returning to the game details page
- Handle its own game state
- Include a reset/restart button
- Be responsive to different screen sizes
- Save high scores to localStorage if applicable

## API Pattern

Each game component should follow this general structure:

```tsx
interface GameProps {
  onBackToDetails?: () => void;
}

const GameName = ({ onBackToDetails }: GameProps) => {
  // Game state and logic

  return (
    <div className="game-container">
      <div className="game-header">
        <h2>Game Title</h2>
        <div className="game-controls">
          <button onClick={resetGame}>Reset</button>
          {onBackToDetails && (
            <button onClick={onBackToDetails}>Back</button>
          )}
        </div>
      </div>
      
      {/* Game content */}
      
    </div>
  );
};

export default GameName;
```

## Currently Implemented Games

1. **Chess** - A classic two-player strategy board game