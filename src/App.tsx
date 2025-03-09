import { ThemeProvider } from './context/ThemeContext';
import { AppRoutes } from './routes';
import { AdSense } from './components/common/AdSense';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AdSense />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;