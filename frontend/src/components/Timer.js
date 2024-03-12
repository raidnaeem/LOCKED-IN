import React, { useState, useRef } from 'react';

const MoveableTimer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const handleInputChange = (e, unit) => {
    const value = parseInt(e.target.value) || 0;
    setTime((prevTime) => ({ ...prevTime, [unit]: value }));
  };

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
      <div>
        <label>Days:</label>
        <input type="number" value={time.days} onChange={(e) => handleInputChange(e, 'days')} />
      </div>
      <div>
        <label>Hours:</label>
        <input type="number" value={time.hours} onChange={(e) => handleInputChange(e, 'hours')} />
      </div>
      <div>
        <label>Minutes:</label>
        <input type="number" value={time.minutes} onChange={(e) => handleInputChange(e, 'minutes')} />
      </div>
      <div>
        <label>Seconds:</label>
        <input type="number" value={time.seconds} onChange={(e) => handleInputChange(e, 'seconds')} />
      </div>
    </div>
  );
};

export default MoveableTimer;