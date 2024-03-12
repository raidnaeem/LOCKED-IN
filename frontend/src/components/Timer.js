import React, { useState, useRef, useEffect } from 'react';

const MoveableTimer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [time, setTime] = useState(300); // Initial time in seconds (300 seconds = 5 minutes)
  const timerRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    if (!isNaN(newTime) && newTime >= 0) {
      setTime(newTime);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (isDragging || isEditing) {
        // Don't update timer while dragging or editing
        return;
      }

      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [isDragging, isEditing, time]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
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
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="number"
          value={time}
          onChange={handleInputChange}
          onBlur={() => setIsEditing(false)}  {/* Updated here to prevent interference */}
          style={{ width: '40px', textAlign: 'center' }}
        />
      ) : (
        <div style={{ fontSize: '16px' }}>{formatTime(time)}</div>
      )}
    </div>
  );
};

export default MoveableTimer;