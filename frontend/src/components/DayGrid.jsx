import React, { useState } from 'react';

const DayGrid = ({ currentDay, currentMonth, currentYear }) => {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get total days in current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Get the weekday index of the first day
  // Save reminders to localStorage
  localStorage.setItem('reminders', JSON.stringify(reminders));

  // Retrieve reminders from localStorage
  const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
  // Initialize state to track user input for each day
  const [reminders, setReminders] = useState(Array(daysInMonth).fill(''));

  const handleReminderChange = (dayIndex, event) => {
    const newReminders = [...reminders];
    newReminders[dayIndex] = event.target.value;
    setReminders(newReminders);
  };

  return (
    <div className="grid-container">
      {/* Render each day cell */}
      {[...Array(daysInMonth)].map((_, index) => {
        const dayOfMonth = index + 1;
        const isCurrentDay = currentDay.getDate() === dayOfMonth;
        const dayClassName = `day ${isCurrentDay ? 'current-day' : ''}`;

        return (
          <div key={index} className={dayClassName}>
            <div className="day-number">{dayOfMonth}</div>
            {/* Editable input for reminders */}
            <input
              type="text"
              value={reminders[index]}
              onChange={(e) => handleReminderChange(index, e)}
              placeholder="Add reminder..."
            />
          </div>
        );
      })}
    </div>
  );
};

export default DayGrid;
