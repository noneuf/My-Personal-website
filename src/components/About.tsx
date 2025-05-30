import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';

const About = () => {
  const skills = [
    'UiPath',
    'Kryon',
    'HTML5 & CSS3',
    'JavaScript',
    'Python',
    'SQL',
    'VBA',
    'VB.Net',
    'Git & Version Control',
    'More is needed? I will adapt'
  ];

  const interests = [
    'Personal Development',
    'Family Time',
    'Movies',
    'Age of Empires II',
    'Learning New Technologies',
    'Anything related to Italy',
  ];

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-page">
      <AnimatedText text="ABOUT ME" element="h1" delay={200} />
      
      <div className="about-content">
        <section className="professional">
          <AnimatedText text="Professional Background" element="h2" delay={400} />
          <div className="content">
            <AnimatedText
              text="I'm an RPA developer and team lead with expertise in UiPath and automation strategy. With several years of experience in building automation solutions, I focus on delivering efficient, scalable, and business-aligned workflows that enhance operational productivity. I'm highly self-driven, quick to learn new technologies, and thrive when adapting to complex challenges."
              delay={600}
            />
            <div className="skills">
              <AnimatedText text="Technical Skills" element="h3" delay={800} />
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`skill-item animated-text ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${900 + index * 100}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="personal">
          <AnimatedText text="Personal Life" element="h2" delay={400} />
          <div className="content">
            <AnimatedText
              text="When I’m not working, I’m spending quality time with my family, which I find to be the most fulfilling part of life. I also enjoy watching movies—ranging from timeless classics to whatever came out last year—and occasionally diving into Age of Empires II (still the best RTS ever made). I’m committed to personal growth, always learning new skills, and I make sure to get in some physical activity at least twice a week to stay sharp and in shape."
              delay={600}
            />
            <div className="interests">
              <AnimatedText text="Interests" element="h3" delay={800} />
              <div className="interests-list">
                {interests.map((interest, index) => (
                  <span
                    key={interest}
                    className={`interest-item animated-text ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: `${900 + index * 100}ms` }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 