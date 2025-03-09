import { useTheme } from '../../hooks/useTheme';
import './ThemeSwitcher.css';

interface ThemeSwitcherProps {
  showLabel?: boolean;
}

export const ThemeSwitcher = ({ showLabel = false }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="theme-switcher">
      <button 
        className="theme-switcher-button"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <div className={`switcher-track ${theme === 'dark' ? 'active' : ''}`}>
          <div className="switcher-thumb">
            <div className="switcher-icon">
              {theme === 'light' ? '☀️' : '🌙'}
            </div>
          </div>
        </div>
        {showLabel && (
          <span className="switcher-label">
            {theme === 'light' ? 'Light' : 'Dark'} Mode
          </span>
        )}
      </button>
    </div>
  );
};
