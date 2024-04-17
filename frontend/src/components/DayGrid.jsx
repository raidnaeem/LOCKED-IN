import React from 'react';
import Day from './Day';
import './Calendar.css';

function DayGrid({currentDay, currentMonth, currentYear, events}) {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); 
    const currentDays = [];

    const ParseDate = (eventDate) => {
      //eventDate comes in format MM/DD/YYYY
      const dateValues = eventDate.split('/');
      //When constructing Date the order is year, monthIndex, day
      return new Date(dateValues[2], dateValues[0] - 1, dateValues[1])
    }

    /*
    const DayComparison = (date, otherDate) => {
      if(date.getFullYear() === otherDate.getFullYear() && date.getDate() === otherDate.getDate() && date.getMonth() === otherDate.getMonth())
      {
        return true;
      }
      return false;
    }
    */

    // Parse dates for events
    const eventDates = events.map(event => ({
      startDay: new Date(ParseDate(event.StartDate)),
      endDay: new Date(ParseDate(event.EndDate)),
    }));
    //up to 6 weeks (42 days) to show prev and next weeks of month
    for (let i = 0; i < 42; i++) {

        //for determing offset in beginning of month
        if (i === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - startingWeekday);
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === currentMonth),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            today: (firstDayOfMonth.toDateString() === currentDay.toDateString()),
            year: firstDayOfMonth.getFullYear(),
            hasEvent: false,
            dayEventList: [],
        }

        //Assigning Events to calendarDay
        for(let i = 0; i < events.length; i++) {
          if(calendarDay.date >= eventDates[i].startDay && calendarDay.date <= eventDates[i].endDay )
          {
            calendarDay.hasEvent = true;
            calendarDay.dayEventList.push(events[i]);
          }
        }

        currentDays.push(calendarDay);
    }
  
    return (
      <div className="table-content">
        {
          currentDays.map((day) => {
            return (
              <Day key={day.date} day={day}/>
            )
          })
        }
      </div>
    )
  }
  
  export default DayGrid;