import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import ToDoProtoType from '../components/ToDoPrototype';
import Timer from '../components/Timer';
import Spotify from '../components/Spotify';
import NavigationTabs from '../components/NavigationTabs';

const PlannerPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Timer />
      <ToDoProtoType />
      <Spotify />
      <NavigationTabs selectedPage={"planner-tab"}/>
    </div>
  );
};

export default PlannerPage;
