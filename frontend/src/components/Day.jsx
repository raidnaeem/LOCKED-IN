import React from 'react';
import './Calendar.css';

function Day({day}) {

    return (
        <div className={`calendar-day ${day.currentMonth ? "current-month" : ""} ${day.today ? "today" : ""}`}>
            <p>
                {day.number}
            </p>
            <div className={` ${day.eventStart ? "inline-block" : "hidden"}`}>
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