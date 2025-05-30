import React from 'react';
import AnimatedText from './AnimatedText';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate('/about');
  };

  return (
    <div className="home">
      <div className="home-content">
        <AnimatedText
          text="WELCOME"
          element="h1"
          delay={200}
        />
        <AnimatedText
          text="I'm passionate about innovation and driven by impact."
          delay={400}
        />
        <AnimatedText
          text="I really enjoy working on cutting-edge projects and developing enabling technologies with the vision that they will bring meaningful improvements to how we live and work."
          delay={600}
        />
        <button 
          className="discover-button"
          onClick={handleDiscoverClick}
        >
          <span className="button-text">Discover More</span>
          <span className="button-icon">→</span>
        </button>
      </div>
      <div className="home-image-container">
        <div className="background-overlay"></div>
      </div>
    </div>
  );
};

export default Home; 