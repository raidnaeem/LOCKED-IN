import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Timer from '../components/Timer';
import NavigationTabs from '../components/NavigationTabs';


const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Timer />
      <NavigationTabs />
    </div>
  );
};

export default CalendarPage;
