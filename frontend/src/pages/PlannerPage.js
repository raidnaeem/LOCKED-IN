import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import ToDoProtoType from '../components/ToDoPrototype';
import Timer from '../components/Timer';
import NavigationTabs from '../components/NavigationTabs';

const PlannerPage = () => {

  document.body.style.backgroundColor = '#F0DCB4';

  return (
    <div>
      <div className='flex justify-between h-1/5 bg-white'>
        <PageTitle />
        <NavigationTabs selectedPage={"planner-tab"}/>
      </div>
      <div className='bg-[#F0DCB4] pb-10'>
        <LoggedInName />
        <ToDoProtoType />
      </div>
    </div>
  );
};

export default PlannerPage;
