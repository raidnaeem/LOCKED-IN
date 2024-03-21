import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const timerRef = useRef(null);
  const [time, setTime] = useState({ totalSeconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);
  const [inputTime, setInputTime] = useState(0); // State to hold input time

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
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  // Function to handle input time change
  const handleInputChange = (e) => {
    setInputTime(parseInt(e.target.value)); // Convert input value to integer
  };

  // Function to set timer to the input time
  const setTimerToInputTime = () => {
    setTime({ totalSeconds: inputTime });
  };

  return (
    <div
      ref={timerRef}
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: '100px',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <div>{formatTime(time.totalSeconds)}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        </div>
        <div>
          <button onClick={() => setTime({ totalSeconds: 0 })}>Reset</button>
        </div>
      </div>
      {/* Input field for setting specific time */}
      <div>
        <input type="number" value={inputTime} onChange={handleInputChange} />
        <button onClick={setTimerToInputTime}>Set Time</button>
      </div>
    </div>
  );
};

export default Timer;