import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import ToDoProtoType from '../components/ToDoPrototype';
import Timer from '../components/Timer';

const PlannerPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Timer />
      <ToDoProtoType />
    </div>
  );
};

export default PlannerPage;
