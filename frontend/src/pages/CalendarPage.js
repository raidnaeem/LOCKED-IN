import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Janurary from '../components/Janurary';

const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Janurary />
    </div>
  );
};

export default CalendarPage;
