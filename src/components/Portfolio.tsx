import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import barberShopImage from '../images/barber_shop.png';
import RpaFinderImage from '../images/RpaFinderImage.png';
import AiFightImage from '../images/AiFightImage.png';
import './Portfolio.css';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showRpaNote, setShowRpaNote] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Show the RPA note popup after a short delay
    const timer = setTimeout(() => {
      setShowRpaNote(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setIsClosing(true);
    // Wait for the animation to complete before hiding the popup
    setTimeout(() => {
      setShowRpaNote(false);
      setIsClosing(false);
    }, 400); // Match this with the CSS animation duration
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.preventDefault(); // Prevent default button behavior
    e.stopPropagation(); // Stop event from bubbling up
    window.open(url, '_blank', 'noopener,noreferrer'); // Open URL safely in new tab
  };

  const projects = [
    {
      title: 'Barber Shop',
      description: '"Elegant Cuts" is a smart barber shop app I built with Base44 in about 4 to 5 hours, showing how AI tools can turn ideas into fast, functional, and professional-grade results.',
      technologies: ['Base44', 'AI', 'React', 'Node.js', 'JavaScipt', 'Google OAuth', 'Twillio'],
      image: barberShopImage,
      url: 'https://app---ec7040e4.base44.app'
    },
    {
      title: 'RPA Opportunity Finder',
      description: 'An AI-powered tool that scans websites to detect automation opportunities—streamlining how businesses identify where RPA can deliver real value, and proving how AI can easily boost efficiency and impact. Use a light weight site to try, otherwise if you have time and coffee try any site.',
      technologies: ['Html', 'CSS', 'Python', 'Uvicorn', 'BeautifulSoup', 'Pandas', 'OpenAI API'],
      image: RpaFinderImage,
      url: 'https://rpa-opportunity-finder.onrender.com/'
    },
    {
      title: '🤖 AI vs AI: The Ultimate Showdown',
      description: 'A creative AI experiment where GPT-4 and Claude debate live on random topics—showcasing multi-agent conversation, real-time reasoning, and the fun side of AI interaction.',
      technologies: ['Node.js + Express', 'Socket.io', 'OpenAI API', 'Claude API', 'DALL·E (OpenAI)', 'JavaScipt'],
      image: AiFightImage,
      url: 'https://ai-fight-app.onrender.com'
    },
  ];

  return (
    <div className="portfolio">
      <AnimatedText text="MY PORTFOLIO" element="h1" delay={200} />
      
      {/* RPA Note Popup */}
      {showRpaNote && (
        <div 
          className={`rpa-note-overlay ${isClosing ? 'closing' : ''}`} 
          onClick={handleClosePopup}
        >
          <div 
            className={`rpa-note-popup ${isClosing ? 'closing' : ''}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-button" 
              onClick={handleClosePopup}
              aria-label="Close"
            >
              ×
            </button>
            <h3>RPA Projects</h3>
            <p>
              I've developed numerous RPA processes that are obviously hard to showcase here, 
              but I'd be happy to tell you about them if you're interested!
            </p>
            <p className="rpa-note-cta">
              In the meantime, you can check out my portfolio and don't forget to click on the "Get impressed" button to see some of my projects.
            </p>
          </div>
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div 
            key={project.title}
            className={`project-card ${isVisible ? 'visible' : ''}`}
            style={{ cursor: project.url ? 'pointer' : 'default' }}
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="project-image"
            />
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={`${project.title}-${tech}`}
                    className={`tech-tag ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${(index * 0.2) + (techIndex * 0.1) + 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.url && (
                <button
                  className="get-impressed-btn"
                  onClick={(e) => handleButtonClick(e, project.url!)}
                >
                  <span>Get impressed</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio; 