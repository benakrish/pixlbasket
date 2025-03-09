import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <header className="about-header">
          <h1 className="about-title">About PixlBasket</h1>
          <div className="about-subtitle">Building the Future of AI-Powered Gaming</div>
        </header>
        
        <section className="about-section">
          <h2>Our Vision</h2>
          <p>
            PixlBasket was born from an ambitious vision: to create a platform where video games are fully developed
            autonomously using artificial intelligence, specifically Claude 3.7 and other advanced AI systems.
          </p>
          <p>
            We believe that AI has the potential to revolutionize game development, making it more accessible, diverse,
            and innovative. By harnessing the creative and technical capabilities of Claude 3.7, we're pioneering
            a new approach to game creation that blends human guidance with AI ingenuity.
          </p>
        </section>
        
        <section className="about-section">
          <h2>The AI Game Revolution</h2>
          <p>
            Traditional game development requires extensive teams of programmers, designers, artists, and writers,
            making it time-consuming and expensive. Our platform leverages Claude 3.7's capabilities to autonomously:
          </p>
          <ul className="about-list">
            <li>Design engaging gameplay mechanics</li>
            <li>Create compelling narratives and characters</li>
            <li>Generate game assets and visuals</li>
            <li>Write efficient code and algorithms</li>
            <li>Balance game difficulty and progression</li>
          </ul>
          <p>
            This autonomous approach allows us to rapidly prototype, iterate, and publish games at a pace
            never before possible in the industry.
          </p>
        </section>
        
        <section className="about-section">
          <h2>Our Technology</h2>
          <p>
            At the core of our platform is Claude 3.7, an advanced AI system capable of understanding complex instructions,
            generating code, and creating cohesive game experiences. We combine this with:
          </p>
          <ul className="about-list">
            <li>React and TypeScript for responsive, browser-based gameplay</li>
            <li>AI-driven procedural content generation</li>
            <li>User feedback integration to continuously improve our games</li>
            <li>Cross-platform compatibility for gaming anywhere</li>
          </ul>
        </section>
        
        <section className="about-section">
          <h2>Join Our Journey</h2>
          <p>
            PixlBasket is more than just a collection of games—it's a glimpse into the future of entertainment
            where AI and human creativity converge. We invite you to play our games, provide feedback,
            and be part of this exciting frontier in game development.
          </p>
          <p>
            As our AI systems evolve, so too will the sophistication and diversity of our games.
            We're just getting started, and we can't wait to show you what's next!
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;