import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Calendar from '../components/Calendar';
import DayGridComponent from '../components/DayGridComponent';

const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Calendar />
    </div>
  );
};

export default CalendarPage;
