import React, { useState, useRef, useEffect } from 'react';
import Sound from '../assets/TimesUp.mp3'; // Assuming your sound import is correct

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [inputHours, setInputHours] = useState('00');
  const [inputMinutes, setInputMinutes] = useState('00');
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
    setTime({ hours: 0, minutes: 0, seconds: 0 });
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
    <div className="w-[388px] h-[268px] relative bg-orange-500 rounded-[26px]">
      <div className="w-[341px] h-[85px] mt-[134px] text-black text-[64px] font-normal font-['Poppins']">
        {formatTime(time.hours)} : {formatTime(time.minutes)} : {formatTime(time.seconds)}
      </div>
      <div className="absolute left-[40px] bottom-[10px] text-white text-[28px] font-normal font-['Poppins']">hrs</div>
      <div className="absolute left-[159px] bottom-[10px] text-white text-[28px] font-normal font-['Poppins']">mins</div>
      <div className="absolute left-[288px] bottom-[10px] text-white text-[28px] font-normal font-['Poppins']">secs</div>
      <div className="w-[388px] h-[134px] absolute top-0 bg-orange-700 rounded-tl-[25px] rounded-tr-[25px]" />
      <div className="absolute top-[9px] left-[30px] text-white text-5xl font-bold font-['Poppins']">meditate</div>
      <div className="absolute top-[67px] left-[30px] text-black text-2xl font-medium font-['Poppins']">add note...</div>
      <button
        className="absolute left-0 bottom-[30px] w-[200px] h-[27px] text-white text-base font-normal bg-transparent"
        onClick={handleStartStop}
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        className="absolute right-0 bottom-[30px] w-[200px] h-[27px] text-white text-base font-normal bg-transparent"
        onClick={handleReset}
      >
        Reset
      </button>
      <audio ref={audioRef} src={Sound} />
    </div>
  );
};

export default Timer;
