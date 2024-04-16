import React, { useState, useRef, useEffect } from 'react';
const Sound = require('../assets/TimesUp.mp3')

const Timer = () => {
  const initialTime = { hours: 0, minutes: 25, seconds: 0 };
  const [isRunning, setIsRunning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [note, setNote] = useState('');
  const timerRef = useRef(null);
  const audioRef = useRef(null);
  const storedTime = JSON.parse(localStorage.getItem('timer')) || initialTime;
  const [time, setTime] = useState(storedTime);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(time));
  }, [time]);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTime({ hours: 0, minutes: 25, seconds: 0 });
    setIsRunning(false);
  };

  const handleMouseDown = (e) => {
    const { clientX, clientY } = e;
    const rect = timerRef.current.getBoundingClientRect();

    const isEdgeClick =
      clientX <= rect.left + 10 ||
      clientX >= rect.right - 10 ||
      clientY <= rect.top + 10 ||
      clientY >= rect.bottom - 10;

    if (isEdgeClick) {
      e.preventDefault();
      setIsDragging(true);
      setDragOffset({
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      timerRef.current.style.left = `${newX}px`;
      timerRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e, type) => {
    let value = parseInt(e.target.value) || 0;
  
    if (type === 'hours') {
      value = Math.max(0, value); // Ensure hours are non-negative
    } else if (type === 'minutes' || type === 'seconds') {
      value = Math.max(0, Math.min(type === 'minutes' ? 59 : 59, value)); // Limit minutes/seconds to valid range
    }
  
    setTime((prevTime) => ({
      ...prevTime,
      [type]: value,
    }));
  };

  // Reset timer when time changes
  useEffect(() => {
    if (!isRunning) {
      setTime(storedTime); // Restore time when paused or stopped
    }
  }, [storedTime, isRunning]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    let interval;
  
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
  
          if (hours === 0 && minutes === 0 && seconds === 0) {
            playSound();
            setIsRunning(false);
            return initialTime; // Reset back to initial time after timer ends
          }
  
          if (seconds === 0) {
            if (minutes === 0 && hours > 0) {
              hours--;
              minutes = 59;
            } else if (minutes > 0) {
              minutes--;
            }
            seconds = 59;
          } else {
            seconds--;
          }
  
          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
  
    return () => clearInterval(interval);
  }, [isRunning]);

  const inputsDisabled = isRunning;

  return (
    <div
      ref={timerRef}
      className="timer-container"
      style={{
        position: 'absolute',
        width: '358.93px',
        height: '243.88px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Top Half */}
      <div
        className="top-section"
        style={{
          width: '100%',
          minHeight: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C15138',
          borderRadius: '26px 26px 0 0',
          padding: '20px',
        }}
      >
        <div style={{ fontSize: '48px', color: 'white', fontFamily: 'Poppins', fontWeight: '700' }}>meditate</div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{
            fontSize: '24px',
            color: 'black',
            fontFamily: 'Poppins',
            fontWeight: '500',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            textAlign: 'center',
            marginTop: '10px',
            width: '90%',
            resize: 'none', // Disable textarea resize
            boxSizing: 'border-box',
          }}
          placeholder="Add notes.."
          disabled={inputsDisabled}
        />
      </div>

      {/* Bottom Half */}
      <div
        className="bottom-section"
        style={{
          width: '100%',
          minHeight: '75%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EA7331',
          borderRadius: '0 0 26px 26px',
          padding: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            value={time.hours}
            onChange={(e) => handleInputChange(e, 'hours')}
            style={{ position: 'absolute', top: 180, left: 50, width: '50px', textAlign: 'center', fontSize: '42px', background: '#EA7331', fontFamily: 'Poppins', fontWeight: '400' }}
            disabled={inputsDisabled}
          />
          <span style={{ position: 'relative', top: -35, left: -38, fontSize: '42px', color: 'black', fontFamily: 'Poppins', fontWeight: '400', margin: '0 10px' }}>:</span>
          <input
            type="text"
            value={time.minutes}
            onChange={(e) => handleInputChange(e, 'minutes')}
            style={{ position: 'absolute', top: 180, left: 150, width: '50px', textAlign: 'center', fontSize: '42px', background: '#EA7331', fontFamily: 'Poppins', fontWeight: '400' }}
            disabled={inputsDisabled}
          />
          <span style={{ position: 'relative', top: -35, left: 32, fontSize: '42px', color: 'black', fontFamily: 'Poppins', fontWeight: '400', margin: '0 10px' }}>:</span>
          <input
            type="text"
            value={time.seconds}
            onChange={(e) => handleInputChange(e, 'seconds')}
            style={{ position: 'absolute', top: 180, left: 255, width: '50px', textAlign: 'center', fontSize: '42px', background: '#EA7331', fontFamily: 'Poppins', fontWeight: '400' }}
            disabled={inputsDisabled}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '10px' }}>
          <div style={{ position: 'absolute', top: 232, left: 60, fontSize: '28px', color: 'white', fontFamily: 'Poppins', fontWeight: '400', marginRight: '20px' }}>hrs</div>
          <div style={{ position: 'absolute', top: 232, left: 150, fontSize: '28px', color: 'white', fontFamily: 'Poppins', fontWeight: '400', marginRight: '20px' }}>mins</div>
          <div style={{ position: 'absolute', top: 232, left: 255, fontSize: '28px', color: 'white', fontFamily: 'Poppins', fontWeight: '400' }}>secs</div>
        </div>

        <div style={{ display: 'flex' }}>
          <button
            style={{
              position: 'absolute',
              top: 277,
              left: 55,
              width: '120px',
              height: '40px',
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Poppins',
              fontWeight: '400',
              background: '#C15138',
              borderRadius: '20px',
              marginRight: '20px',
            }}
            onClick={handleStartStop}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            style={{
              position: 'absolute',
              top: 277,
              left: 190,
              width: '120px',
              height: '40px',
              color: 'white',
              fontSize: '20px',
              fontFamily: 'Poppins',
              fontWeight: '400',
              background: '#C15138',
              borderRadius: '20px',
            }}
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
      {/* Audio: Time's Up */}
      <audio ref={audioRef} src={Sound} />
    </div>
  );
};

export default Timer;