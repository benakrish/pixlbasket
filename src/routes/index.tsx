import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('../components/pages/Home'));
const Games = lazy(() => import('../components/pages/Games'));
const GameDetail = lazy(() => import('../components/pages/GameDetail'));
const About = lazy(() => import('../components/pages/About'));
const Contact = lazy(() => import('../components/pages/Contact'));
const NotFound = lazy(() => import('../components/pages/NotFound'));

export const AppRoutes = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingSpinner fullPage text="Loading..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameId" element={<GameDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};