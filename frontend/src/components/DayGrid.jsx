import React, { useState, useEffect } from 'react';

const DayGrid = ({ currentDay, currentMonth, currentYear }) => {
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Get total days in current month

  // Initialize state to track user input for each day
  const [reminders, setReminders] = useState(() => {
    // Retrieve reminders from localStorage or initialize with empty strings
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    return Array(daysInMonth).fill('').map((_, index) => savedReminders[index] || '');
  });

  const handleReminderChange = (dayIndex, event) => {
    const newReminders = [...reminders];
    newReminders[dayIndex] = event.target.value;
    setReminders(newReminders);

    // Save updated reminders to localStorage
    localStorage.setItem('reminders', JSON.stringify(newReminders));
  };

  useEffect(() => {
    // Update reminders in state with data from localStorage when component mounts
    const savedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
    setReminders(savedReminders);
  }, [daysInMonth]); // Trigger effect when daysInMonth changes (i.e., when month/year change)

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
