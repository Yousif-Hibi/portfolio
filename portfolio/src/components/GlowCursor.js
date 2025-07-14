import { useEffect, useState } from 'react';
import './GlowCursor.css';

const GlowCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState(Array(3).fill({ x: -100, y: -100 }));
  const baseColor = '0, 18, 51'; // #001233
  const baseSize = 220; // Large size

  useEffect(() => {
    let animationFrameId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const animate = () => {
      currentX = lerp(currentX, targetX, 0.2);
      currentY = lerp(currentY, targetY, 0.2);
      
      setPosition({ x: currentX, y: currentY });
      
      setTrail(prev => {
        const newTrail = [{ x: currentX, y: currentY }];
        for (let i = 0; i < prev.length - 1; i++) {
          newTrail.push({
            x: lerp(prev[i].x, newTrail[i].x, 0.4),
            y: lerp(prev[i].y, newTrail[i].y, 0.4)
          });
        }
        return newTrail;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    animate();
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        className="glow-main"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          background: `radial-gradient(circle, 
            rgba(${baseColor}, 0.35) 0%, 
            rgba(${baseColor}, 0.1) 80%)`,
          filter: `blur(10px)` 
        }}
      />
      
      {trail.map((pos, index) => (
        <div
          key={index}
          className="glow-trail"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            width: `${baseSize * (1 - index * 0.15)}px`,
            height: `${baseSize * (1 - index * 0.15)}px`,
            opacity: 0.8 - (index * 0.2), // Increased from 0.7
            filter: `blur(${15 + (index * 5)}px)`
          }}
        />
      ))}
    </>
  );
};

export default GlowCursor;