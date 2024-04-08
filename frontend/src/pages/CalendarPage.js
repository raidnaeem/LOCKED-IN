import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Timer from '../components/Timer';


const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Timer />
    </div>
  );
};

export default CalendarPage;
