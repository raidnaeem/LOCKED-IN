import React from 'react';

const DayBlock = ({ day, date, isActive }) => {
  const opacityClass = isActive ? '' : 'opacity-20';
  return (
    <div className="w-[436px] h-[300px] border-4 border-stone-400 flex-col justify-center items-center inline-flex">
      <div className={`w-[338.44px] text-center text-yellow-600 text-5xl font-normal font-['Enigma'] ${opacityClass}`}>
        {date}
      </div>
      <div className={`w-[338.44px] text-center text-yellow-600 text-5xl font-normal font-['Enigma'] ${opacityClass}`}>
        {day}
      </div>
    </div>
  );
};

function January() {
  const days = [
    { day: 'Sun', date: '30', isActive: false },
    { day: 'Mon', date: '07', isActive: true },
    { day: 'Mon', date: '14', isActive: true },
    { day: 'Mon', date: '21', isActive: true },
    { day: 'Mon', date: '28', isActive: true },
    { day: 'Tue', date: '01', isActive: true },
    { day: 'Tue', date: '08', isActive: true },
    { day: 'Tue', date: '15', isActive: true },
    { day: 'Tue', date: '22', isActive: true },
    { day: 'Tue', date: '29', isActive: true },
    { day: 'Wed', date: '02', isActive: true },
    { day: 'Wed', date: '09', isActive: true },
    { day: 'Wed', date: '16', isActive: true },
    { day: 'Wed', date: '23', isActive: true },
    { day: 'Wed', date: '30', isActive: true },
    { day: 'Thu', date: '03', isActive: true },
    { day: 'Thu', date: '10', isActive: true },
    { day: 'Thu', date: '17', isActive: true },
    { day: 'Thu', date: '24', isActive: true },
    { day: 'Thu', date: '31', isActive: true },
    { day: 'Fri', date: '04', isActive: true },
    { day: 'Fri', date: '11', isActive: true },
    { day: 'Fri', date: '18', isActive: true },
    { day: 'Fri', date: '25', isActive: true },
    { day: 'Sat', date: '05', isActive: true },
    { day: 'Sat', date: '12', isActive: true },
    { day: 'Sat', date: '19', isActive: true },
    { day: 'Sat', date: '26', isActive: true },
    { day: 'Sun', date: '06', isActive: true },
    { day: 'Sun', date: '13', isActive: true },
    { day: 'Sun', date: '20', isActive: true },
    { day: 'Sun', date: '27', isActive: true },
  ];

  return (
    <div className="w-[3370px] h-[2384px] relative">
      <div className="w-[3052px] left-[160px] top-[524px] absolute rounded-[64px] border-4 border-stone-400 justify-start items-start inline-flex flex-wrap">
        {days.map((dayInfo, index) => (
          <DayBlock key={index} {...dayInfo} />
        ))}
      </div>
      <div className="left-[160px] top-[160px] absolute text-yellow-600 text-9xl font-normal font-['Enigma']">January</div>
      <div className="w-[806px] h-[124px] left-[2404px] top-[160px] absolute justify-end items-center inline-flex" />
    </div>
  );
}

export default January;