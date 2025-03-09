# PixlBasket

A modern React application for browser-based games built with Vite, React, and TypeScript.

## Project Structure

The project follows a component-based architecture with the following structure:

```
src/
├── assets/             # Static assets like images and icons
├── components/         # UI components organized by function
│   ├── common/         # Reusable UI components
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   └── pages/          # Page-specific components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── routes/             # Routing configuration
├── styles/             # Global styles and variables
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## Features

- 🎮 Browser-based game platform
- 🎨 Light/Dark theme support
- 📱 Fully responsive design
- 🧩 Component-based architecture
- 🚀 Built with Vite for fast development
- 📦 Modern React with hooks and context
- 🔍 Search and categorization for games

## Common Components

- **Button**: Versatile button component with variants and states
- **Card**: Flexible card component for displaying content
- **Modal**: Popup dialog for interactive content
- **LoadingSpinner**: Visual indicator for loading states
- **ThemeSwitcher**: Toggle between light and dark themes

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PixlBasket
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Game Development

To add a new game to the platform:

1. Create a new directory in `src/components/games/`
2. Implement your game logic and UI
3. Add routing in `routes/index.tsx`
4. Add game metadata to the games list

## Theme Customization

The project uses CSS variables for theming. You can customize the colors, fonts, and other design tokens in `src/styles/variables.css`.

## License

MIT