import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Calendar from '../components/Calendar';
import DayGridComponent from '../components/DayGridComponent';
import NavigationTabs from '../components/NavigationTabs';

const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Calendar />
      <NavigationTabs />
    </div>
  );
};

export default CalendarPage;
