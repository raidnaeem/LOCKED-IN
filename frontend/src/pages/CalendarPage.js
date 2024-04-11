import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CalendarMonthly from '../components/CalendarMonthly';
import DayGridComponent from '../components/DayGridComponent';
import NavigationTabs from '../components/NavigationTabs';

const CalendarPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <CalendarMonthly />
      <DayGridComponent />
      <NavigationTabs selectedPage={"calendar-tab"}/>
    </div>
  );
};

export default CalendarPage;
