import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CalendarMonthly from '../components/CalendarMonthly';
import CalendarMonthlyB from '../components/CalendarMonthlyB';
import DayGridComponent from '../components/DayGridComponent';
import NavigationTabs from '../components/NavigationTabs';

const CalendarPage = () => {

  document.body.style.backgroundColor = '#AAA06C';

  return (
    <div>
      <div className='flex justify-between h-1/5 bg-white'>
        <PageTitle />
        <NavigationTabs selectedPage={"calendar-tab"}/>
      </div>
      <LoggedInName/>
      <CalendarMonthlyB />
    </div>
  );
};

export default CalendarPage;
