import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // State to manage edit mode
  const [inputHours, setInputHours] = useState('');
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  const handleMouseDown = (e) => {
    if (e.target === timerRef.current) {
      e.preventDefault();
      setIsDragging(true);
      const rect = timerRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
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
        setTime((prevTime) => ({ ...prevTime, seconds: prevTime.seconds + elapsedSeconds }));
        setPausedAt(null);
      } else if (inputHours.trim() || inputMinutes.trim() || inputSeconds.trim()) {
        const hours = inputHours ? parseInt(inputHours) : 0;
        const minutes = inputMinutes ? parseInt(inputMinutes) : 0;
        const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
        setTime({ hours, minutes, seconds });
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
          let newHours = prevTime.hours;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes -= 1;
          }

          if (newMinutes < 0) {
            newMinutes = 59;
            newHours -= 1;
          }

          if (newHours < 0) {
            newHours = 0;
            newMinutes = 0;
            newSeconds = 0;
            setIsRunning(false);
          }

          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === 'hours') setInputHours(value);
    if (type === 'minutes') setInputMinutes(value);
    if (type === 'seconds') setInputSeconds(value);
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      setTime({
        hours: parseInt(inputHours),
        minutes: parseInt(inputMinutes),
        seconds: parseInt(inputSeconds)
      });
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
        minWidth: '300px', // Ensure the timer is wide enough
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
              value={inputHours}
              onChange={(e) => handleInputChange(e, 'hours')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{ width: '30px', marginRight: '5px', textAlign: 'center' }}
              autoFocus
            />
            h
            <input
              type="text"
              value={inputMinutes}
              onChange={(e) => handleInputChange(e, 'minutes')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{ width: '30px', marginLeft: '5px', marginRight: '5px', textAlign: 'center' }}
            />
            m
            <input
              type="text"
              value={inputSeconds}
              onChange={(e) => handleInputChange(e, 'seconds')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{ width: '30px', marginLeft: '5px', textAlign: 'center' }}
            />
            s
          </>
        ) : (
          `${time.hours}h ${time.minutes}m ${time.seconds}s`
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={() => setTime({ hours: 0, minutes: 0, seconds: 0 })}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;