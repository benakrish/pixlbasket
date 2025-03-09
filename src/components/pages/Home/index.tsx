import { Hero } from './Hero';
import { FeaturedGames } from './FeaturedGames';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedGames />
    </div>
  );
};

export default Home;
