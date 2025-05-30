import React, { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  element?: 'p' | 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  element = 'p',
  className = '',
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const Element = element;

  return (
    <Element className={`animated-text ${isVisible ? 'visible' : ''} ${className}`}>
      {text}
    </Element>
  );
};

export default AnimatedText; 