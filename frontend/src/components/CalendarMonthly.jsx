import React from 'react';
import './Calendar.css'; // Import external CSS for component styling

const CalendarMonthly = () => {
  return (
    <div className="calendarContainer">
      <div className="header">
        <div className="month">MONTH</div>
        <div className="year">YEAR</div>
      </div>
      <div className="footer">
        <div className="addEvent">
          <div className="addEventButton">+</div>
          <div className="addEventText">Add Event</div>
        </div>
        <div className="searchEvent">Search Event</div>
      </div>
    </div>
  );
};

export default CalendarMonthly;
