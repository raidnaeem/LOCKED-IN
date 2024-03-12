import React, { useState, useRef, useEffect } from 'react';

const MoveableTimer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - timerRef.current.clientWidth / 2,
        y: e.clientY - timerRef.current.clientHeight / 2,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (isDragging) {
      clearInterval(interval); // Pause the timer while dragging
    } else {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [isDragging]);

  return (
    <div
      ref={timerRef}
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <div style={{ fontSize: '18px', color: '#333' }}>
        Timer: {seconds} seconds
      </div>
    </div>
  );
};

export default MoveableTimer;