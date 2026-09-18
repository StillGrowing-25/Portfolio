import React, { useEffect, useState } from 'react';

export default function SpotlightCursor({ spotlightEnabled = true }) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      // Update root CSS vars for global spotlight background beam
      document.documentElement.style.setProperty('--mouse-x', `${x}px`);
      document.documentElement.style.setProperty('--mouse-y', `${y}px`);

      // Update hovered spotlight card variables
      const card = e.target.closest('.spotlight-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const cardX = x - rect.left;
        const cardY = y - rect.top;
        card.style.setProperty('--card-x', `${cardX}px`);
        card.style.setProperty('--card-y', `${cardY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth trailing ring physics
  useEffect(() => {
    let animId;
    const updateDot = () => {
      setDotPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(updateDot);
    };
    animId = requestAnimationFrame(updateDot);
    return () => cancelAnimationFrame(animId);
  }, [position]);

  // Hover detection for buttons & links
  useEffect(() => {
    const handleOver = (e) => {
      if (e.target.closest('a, button, .spotlight-card, input, textarea')) {
        setIsHovered(true);
      }
    };
    const handleOut = (e) => {
      if (e.target.closest('a, button, .spotlight-card, input, textarea')) {
        setIsHovered(false);
      }
    };

    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    return () => {
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  if (!spotlightEnabled) return null;

  return (
    <>
      <div id="spotlight-bg" />
      <div
        className="spotlight-cursor-dot"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
      <div
        className={`spotlight-cursor-ring ${isHovered ? 'cursor-grow' : ''}`}
        style={{
          transform: `translate(${dotPos.x - (isHovered ? 34 : 22)}px, ${dotPos.y - (isHovered ? 34 : 22)}px)`,
        }}
      />
    </>
  );
}
