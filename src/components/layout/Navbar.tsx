import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

interface NavItem {
  label: string;
  path: string;
}

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { label: 'Home', path: '#/' },
    { label: 'Games', path: '#/games' },
    { label: 'About', path: '#/about' },
    { label: 'Contact', path: '#/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <div className="navbar-logo">
          <a href="/">PixlBasket</a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="navbar-menu-button" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={`menu-icon ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        {/* Desktop Navigation */}
        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <a href={item.path}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme toggle button */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
};
