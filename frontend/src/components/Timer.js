import React, { useState, useRef, useEffect } from 'react';
const Sound = require('../assets/TimesUp.mp3')

const Timer = () => {
  const [position, setPosition] = useState({ x: 50, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');

  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

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
            playSound();
          }

          return { minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === 'minutes') {
      setInputMinutes(value);
    } else if (type === 'seconds') {
      setInputSeconds(value);
    }
  };

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
    const minutes = inputMinutes ? parseInt(inputMinutes) : 0;
    const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
    setTime({ minutes, seconds });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditable(false);
      const minutes = inputMinutes ? parseInt(inputMinutes) : 0;
      const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
      setTime({ minutes, seconds });
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
              value={inputMinutes}
              onChange={(e) => handleInputChange(e, 'minutes')}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              style={{ width: '30px', marginRight: '5px', textAlign: 'center' }}
              autoFocus
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
          <>
            <span
              style={{
                cursor: 'text',
                marginRight: '5px',
              }}
              onClick={() => setIsEditable(true)}
            >
              {time.minutes}
            </span>
            m
            <span
              style={{
                cursor: 'text',
                marginLeft: '5px',
              }}
              onClick={() => setIsEditable(true)}
            >
              {time.seconds}
            </span>
            s
          </>
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={handleStartStop}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          style={{ marginLeft: '10px', marginBottom: '10px' }}
          onClick={() => setTime({ minutes: 25, seconds: 0 })}
        >
          Reset
        </button>
      </div>
      <audio ref={audioRef} src={Sound} />
    </div>
  );
};

export default Timer;