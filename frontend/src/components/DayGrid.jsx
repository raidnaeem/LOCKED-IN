import React from 'react';
import './Calendar.css';

function DayGrid({currentDay, currentMonth, currentYear}) {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const startingWeekday = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay(); 
    let currentDays = [];
  
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
            year: firstDayOfMonth.getFullYear()
        }

        currentDays.push(calendarDay);
    }
  
    return (
      <div className="table-content">
        {
          currentDays.map((day) => {
            return (
              <div className={"calendar-day" + (day.currentMonth ? " current-month" : "") + (day.today ? " today" : "")}>
                <p>
                    {day.number}
                </p>
              </div>
            )
          })
        }
      </div>
    )
  }
  
  export default DayGrid;