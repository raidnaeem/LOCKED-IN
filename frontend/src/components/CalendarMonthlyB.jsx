import React, {useState} from 'react';
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

  

  return (
    <div className="bg-[#AAA06C]">
      {/*Calendar Header*/}
      <div className="header">
          <Button>
            prev
          </Button>
          <div className="month p-2 ">{months[currentMonth]}</div>
          <div className="year p-2">{currentYear}</div>
          <Button>
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
