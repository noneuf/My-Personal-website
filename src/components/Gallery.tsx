import React, { useState, useEffect } from 'react';
import AnimatedText from './AnimatedText';
import './Gallery.css';
import image9 from '../images/GaleryPics/9.jpeg';
import image11 from '../images/GaleryPics/11.jpeg';
import image2 from '../images/GaleryPics/2.jpeg';
import image7 from '../images/GaleryPics/7.jpeg';
import image1 from '../images/GaleryPics/1.jpg';
import image8 from '../images/GaleryPics/8.jpeg';
import image5 from '../images/GaleryPics/5.jpeg';

const Gallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const familyPhotos = [
    {
      id: 1,
      src: image9,
      caption: 'Family Time',
      description: 'Precious moments with my loved ones'
    },
    {
      id: 2,
      src: image11,
      caption: 'Adventures',
      description: 'My little ones wanted to see a volcano from close so we went up to find one'
    },
    {
      id: 3,
      src: image2,
      caption: 'My little princess loves cut animals',
      description: "Do your kids love cut animals? I'm sure they will love this one"
    },
    {
      id: 4,
      src: image7,
      caption: 'Sam the firefighter',
      description: 'Sam is a firefighter and he loves his job even when it does not involve fire'
    },
    {
      id: 5,
      src: image1,
      caption: 'Pure joy in one little smile',
      description: 'A candid moment of childhood happiness'
    },
    {
      id: 6,
      src: image8,
      caption: 'Family adventures, one trail at a time',
      description: 'I would be curious if you can find out where this is...'
    },
    {
      id: 7,
      src: image5,
      caption: 'Golden hour, golden love',
      description: 'A heartwarming embrace between mother and daughter'
    }
  ];

  useEffect(() => {
    // Update CSS variable when current image changes
    document.documentElement.style.setProperty(
      '--current-image',
      `url(${familyPhotos[currentIndex].src})`
    );
  }, [currentIndex, familyPhotos]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === familyPhotos.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? familyPhotos.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const goToSlide = (index: number) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <div className={`gallery-page with-bg`}>
      <div className="gallery-intro">
        <AnimatedText text="GALLERY" element="h1" delay={200} />
        <AnimatedText 
          text="Welcome to my family gallery - a collection of cherished moments with the people who mean the world to me. Each photo tells a story of love, laughter, and the beautiful journey we share together." 
          delay={400}
        />
      </div>

      <div className="carousel-container">
        <div className="carousel-content">
          <button className="carousel-button prev" onClick={prevSlide} aria-label="Previous slide">
            ‹
          </button>
          <div className="carousel-slides">
            {familyPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className={`carousel-slide ${index === currentIndex ? 'active' : ''} ${
                  isTransitioning ? 'transitioning' : ''
                }`}
                style={{
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                }}
              >
                <img 
                  src={photo.src} 
                  alt={photo.caption}
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <div className="carousel-overlay-content">
                    <h3>{photo.caption}</h3>
                    <p className="photo-description">{photo.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-button next" onClick={nextSlide} aria-label="Next slide">
            ›
          </button>
        </div>
        
        <div className="carousel-indicators">
          {familyPhotos.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery; 