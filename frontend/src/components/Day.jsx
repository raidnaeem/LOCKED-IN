import React from 'react';
import './Calendar.css';

function Day({day}) {

    const ParseDate = (eventDate, eventTime) => {
        //eventDate comes in format MM/DD/YYYY
        const dateValues = eventDate.split('/');
        //eventTime comes in format HH:MM, military time
        const timeValues = eventTime.split(':');
        //When constructing Date the order is year, monthIndex, day, hour, minute
        return new Date(dateValues[2], dateValues[0] - 1, dateValues[1], timeValues[0], timeValues[1])
      }
    
    return (
        <div className={`calendar-day ${day.currentMonth ? "current-month" : ""} ${day.today ? "today" : ""}`}>
            <p>
                {day.number}
            </p>
            <div className={` ${day.hasEvent ? "inline-block" : "hidden"}`}>
                {
                    day.dayEventList.map((event) => {
                        return (
                            <div key={event._id}>
                                {event.Event}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
  }
  
  export default Day;