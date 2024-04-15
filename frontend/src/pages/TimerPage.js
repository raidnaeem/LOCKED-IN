import React from 'react';

import PageTitle from '../components/PageTitle';
import NavigationTabs from '../components/NavigationTabs';
import Timer from '../components/Timer';
import LoggedInName from '../components/LoggedInName';

const TimerPage = () =>
{

    return(
      <div>
        <div className='flex justify-between h-1/5 bg-white'>
          <PageTitle />
          <NavigationTabs selectedPage={"timer-tab"}/>
        </div>
        <LoggedInName />
        <Timer />
      </div>
    );
};

export default TimerPage;
