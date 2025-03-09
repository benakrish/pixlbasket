import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;