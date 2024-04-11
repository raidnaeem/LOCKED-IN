import React from 'react';

import PageTitle from '../components/PageTitle';
import NavigationTabs from '../components/NavigationTabs';
import Timer from '../components/Timer';
import LoggedInName from '../components/LoggedInName';

const TimerPage = () =>
{

    return(
      <div>
        <PageTitle />
        <NavigationTabs selectedPage={"timer-tab"}/>
        <LoggedInName />
        <Timer />
      </div>
    );
};

export default TimerPage;
