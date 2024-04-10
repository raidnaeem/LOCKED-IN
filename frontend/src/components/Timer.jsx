import React, { useState, useRef, useEffect } from 'react';
import Sound from '../assets/TimesUp.mp3'; // Assuming your sound import is correct

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 25, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [inputHours, setInputHours] = useState('00');
  const [inputMinutes, setInputMinutes] = useState('25');
  const [inputSeconds, setInputSeconds] = useState('00');

  const audioRef = useRef(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const formatTime = (timeValue) => (timeValue < 10 ? `0${timeValue}` : `${timeValue}`);

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setTime({ hours: 0, minutes: 25, seconds: 0 });
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          let { hours, minutes, seconds } = prevTime;
          if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsRunning(false);
            playSound();
            return prevTime;
          }

          if (minutes === 0 && seconds === 0) {
            hours = hours - 1;
            minutes = 59;
          }

          if (seconds === 0) {
            minutes = minutes - 1;
            seconds = 59;
          } else {
            seconds = seconds - 1;
          }

          return { hours, minutes, seconds };
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (type === 'hours') {
      setInputHours(value);
    } else if (type === 'minutes') {
      setInputMinutes(value);
    } else if (type === 'seconds') {
      setInputSeconds(value);
    }
  };

  const handleBlur = () => {
    const hours = parseInt(inputHours) || 0;
    const minutes = parseInt(inputMinutes) || 0;
    const seconds = parseInt(inputSeconds) || 0;
    setTime({ hours, minutes, seconds });
    setIsEditable(false);
  };

  return (
    <div className="w-[200px] h-[159px] relative">
      <div className="w-[200px] h-[79px] left-0 top-[80px] absolute bg-amber-600 rounded-bl-xl rounded-br-xl" />
      <div className="w-[200px] h-20 left-0 top-0 absolute bg-orange-700 rounded-tl-xl rounded-tr-xl">
        <div
          className="text-white text-2xl font-normal font-['Inter']"
          style={{ marginLeft: '19px', marginTop: '4px' }}
        >
          Meditate
        </div>
        <div
          className="text-black text-sm font-normal font-['Inter']"
          style={{ marginLeft: '19px', marginTop: '31px' }}
        >
          Add note...
        </div>
      </div>
      <div className="w-[33px] h-[27px] left-[17px] top-[88px] absolute text-black text-2xl font-normal font-['Inter']">
        {formatTime(time.hours)}
      </div>
      <div className="w-[33px] h-[27px] left-[81px] top-[88px] absolute text-black text-2xl font-normal font-['Inter']">
        {formatTime(time.minutes)}
      </div>
      <div className="w-[33px] h-[27px] left-[145px] top-[88px] absolute text-black text-2xl font-normal font-['Inter']">
        {formatTime(time.seconds)}
      </div>
      <div className="w-9 h-[18px] left-[21px] top-[117px] absolute text-white text-base font-normal font-['Inter']">
        hrs
      </div>
      <div className="w-9 h-[18px] left-[78px] top-[117px] absolute text-white text-base font-normal font-['Inter']">
        mins
      </div>
      <div className="w-9 h-[18px] left-[143px] top-[117px] absolute text-white text-base font-normal font-['Inter']">
        secs
      </div>
      <div className="w-[13px] h-[31px] left-[59px] top-[86px] absolute text-black text-2xl font-normal font-['Inter']">:</div>
      <div className="w-[13px] h-[31px] left-[123px] top-[86px] absolute text-black text-2xl font-normal font-['Inter']">:</div>
      <button
        className="w-[200px] h-[27px] absolute left-0 top-[117px] text-white text-base font-normal font-['Inter'] bg-transparent"
        onClick={handleStartStop}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        className="w-[200px] h-[27px] absolute left-0 top-[117px] text-white text-base font-normal font-['Inter'] bg-transparent"
        onClick={handleReset}
      >
        Reset
      </button>
      <audio ref={audioRef} src={Sound} />
    </div>
  );
};

export default Timer;