import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ totalSeconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [inputValue, setInputValue] = useState(''); // State to hold input value

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - offsetX,
          y: e.clientY - offsetY,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const rect = timerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setPosition({ x: rect.left, y: rect.top });
  };

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setPausedAt(new Date());
    } else {
      setIsRunning(true);
      if (pausedAt) {
        const elapsedSeconds = Math.floor((new Date() - pausedAt) / 1000);
        setTime((prevTime) => ({ totalSeconds: prevTime.totalSeconds + elapsedSeconds }));
        setPausedAt(null);
      } else if (inputValue.trim()) {
        const inputParts = inputValue.split(' '); // Split input by spaces
        let totalSeconds = 0;
        inputParts.forEach(part => {
          const value = parseInt(part);
          if (!isNaN(value)) {
            if (part.includes('h')) {
              totalSeconds += value * 3600; // Convert hours to seconds
            } else if (part.includes('m')) {
              totalSeconds += value * 60; // Convert minutes to seconds
            } else if (part.includes('s')) {
              totalSeconds += value; // Seconds
            }
          }
        });
        setTime({ totalSeconds });
      }
    }
  };

  useEffect(() => {
    let interval;

    if (isRunning && time.totalSeconds > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => ({ totalSeconds: prevTime.totalSeconds - 1 }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time.totalSeconds]);

  const formatTime = (seconds) => {
    const pad = (num) => String(num).padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${pad(hours)}h ${pad(minutes)}m ${pad(remainingSeconds)}s`;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
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
        contentEditable={true} // Allow editing the timer content
        suppressContentEditableWarning={true}
        onBlur={(e) => setInputValue(e.target.innerText)} // Update input value on blur
      >
        {formatTime(time.totalSeconds)}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button style={{ marginRight: '10px', marginBottom: '10px' }} onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={() => setTime({ totalSeconds: 0 })}>Reset</button>
      </div>
      {/* Input field for setting specific time */}
      <div style={{ marginTop: '10px' }}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default Timer;