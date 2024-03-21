import React, { useState, useRef, useEffect } from 'react';

const MoveableTimer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef(null);
  const [time, setTime] = useState({ totalSeconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [pausedAt, setPausedAt] = useState(null);

  const handleMouseDown = (e) => {
    const boundingRect = timerRef.current.getBoundingClientRect();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - boundingRect.left,
      y: e.clientY - boundingRect.top,
    });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
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

  return (
    <div
      ref={timerRef}
      style={{
        position: 'absolute',
        left: position.x + 'px',
        top: position.y + 'px',
        transform: 'translate(-50%, -50%)', // Center the timer component
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
    >
      <div>{formatTime(time.totalSeconds)}</div>
      <div>
        <button onClick={handleStartStop}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={() => setTime({ totalSeconds: 0 })}>Reset</button>
      </div>
    </div>
  );
};

export default MoveableTimer;