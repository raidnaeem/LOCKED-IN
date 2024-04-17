import React, {useState} from 'react';
import { Select } from '@chakra-ui/react'
import DayGrid from './DayGrid';
import './Calendar.css';
import { Button } from '@chakra-ui/react';
const addButton = require('../assets/AddButton.png');
const searchButton = require('../assets/SearchEvent.png');

const CalendarMonthlyB = () =>  {

  const [currentDay, setCurrentDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear())

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [];
  for(let i = 0; i <= 30; i++)
  {
    years.push((currentYear - 15) + i);
  }

  const changeMonth = async month => {
    month = parseInt(month);
    if(month < 0)
    {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
    else if(month > 11){
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else{
      setCurrentMonth(month);
    }
  }
  

  return (
    <div className="bg-[#AAA06C]">
      {/*Calendar Header*/}
      <div className="header w-[90%] md:w-[80%]">
          <Button onClick={() => changeMonth(currentMonth - 1)}>
            prev
          </Button>
          <div className="month p-2 w-1/3 md:w-1/4 font-poppins">
            <Select value={currentMonth} onChange={(e) => changeMonth(e.target.value)}>
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </Select>
          </div>
          <div className="year p-2 w-1/3 md:w-1/4 font-poppins">
            <Select value={currentYear} onChange={(e) => setCurrentYear(e.target.value)}>
              {years.map((year, index) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </div>
          <Button onClick={() => changeMonth(currentMonth + 1)}>
            next
          </Button>
      </div>

      {/*Calendar Body*/}
      <div className="calendar-body p-5">
          <div id="weekday-header" className="flex align-center justify-center">
          {
              weekdays.map((weekday) => {
                return (
                <div 
                  className="weekday">{weekday}
                </div>
                );
              })
          }
          </div>
          <DayGrid currentDay={currentDay} currentMonth={currentMonth} currentYear={currentYear}/>
        </div>

      {/*Calendar Header*/}
      <div className="footer">

      </div>
    </div>
  );
};

export default CalendarMonthlyB;
