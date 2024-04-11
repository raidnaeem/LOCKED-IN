import React from 'react';
import './Calendar.css';
addButton = require('../assets/AddButton.png');
searchButton = require('../assets/SearchEvent.png');


const CalendarMonthly = () => {
  return (
    <div className="calendarContainer">
      <div className="header">
        <div className="month">MONTH</div>
        <div className="year">YEAR</div>
      </div>
      <div className="footer">
        <div className="addEvent">
          <img src={addButton} alt="Add Event" className="addEventButton" />
          <div className="addEventText">Add Event</div>
        </div>
        <div className="searchEvent">
          <img src={searchButton} alt="Add Event" className="searchEventButton" />
          <div className="searchEvent">Search Event</div>
        </div>
      </div>
    </div>
  );
};

export default CalendarMonthly;
