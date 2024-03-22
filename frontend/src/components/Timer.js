import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [inputSeconds, setInputSeconds] = useState('');

  const handleMouseDown = (e) => {
    if (e.target === timerRef.current) {
      e.preventDefault();
      setIsDragging(true);
      const rect = timerRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setPausedAt(new Date());
    } else {
      setIsRunning(true);
      if (pausedAt) {
        const elapsedSeconds = Math.floor((new Date() - pausedAt) / 1000);
        setTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds }));
        setPausedAt(null);
      }
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let newSeconds = prevTime.seconds - 1;
          let newMinutes = prevTime.minutes;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }

          if (newMinutes < 0) {
            newMinutes = 0;
            newSeconds = 0;
            setIsRunning(false);
          }

          return { minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
    const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
    setTime((prevTime) => ({ ...prevTime, seconds }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
      setTime((prevTime) => ({ ...prevTime, seconds }));
    }
  };

  return (
    <div
      ref={timerRef}
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        cursor: isDragging ? 'grabbing' : 'grab',
        border: '4px solid black', // Thick black border
        padding: '10px',
        minWidth: '200px', // Ensure the timer is wide enough
        textAlign: 'center', // Center the timer horizontally
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        style={{
          cursor: 'text', // Change cursor to text when clicking inside the timer
          fontSize: '24px', // Increase font size
          lineHeight: '1.5', // Set line height
          minHeight: '50px', // Ensure vertical centering
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={handleEditClick}
      >
        {isEditable ? (
          <>
            <input
              type="text"
              value={inputSeconds}
              onChange={(e) => setInputSeconds(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{ width: '30px', textAlign: 'center' }}
              autoFocus
            />
            s
          </>
        ) : (
          <>
            <span
              style={{
                cursor: 'text',
              }}
              onClick={() => setIsEditable(true)}
            >
              {time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds}
            </span>
          </>
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          style={{ marginLeft: '10px', marginBottom: '10px' }}
          onClick={() => setTime({ minutes: 0, seconds: 0 })}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
