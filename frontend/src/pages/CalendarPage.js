import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Calendar from '../components/Calendar';

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
