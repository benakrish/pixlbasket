import { Hero } from './Hero';
import { FeaturedGames } from './FeaturedGames';
import { AdDisplay } from '../../common/AdDisplay';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <AdDisplay adSlot="1234567890" format="horizontal" />
      <FeaturedGames />
      <AdDisplay adSlot="0987654321" format="rectangle" className="mt-8" />
    </div>
  );
};

export default Home;