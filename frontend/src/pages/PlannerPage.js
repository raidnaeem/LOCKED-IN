import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import Timer from '../components/Timer';

const PlannerPage = () => {
  return (
    <div>
      <PageTitle />
      <LoggedInName />
      <Timer /> {/* Include the MoveableTimer component here */}
      <div id='temp' style={{ textAlign: 'center', marginTop: '10%' }}>
        <p style={{ fontWeight: 'bold', fontSize: 35 }}>
          Temporary page after signing in
        </p>
      </div>
    </div>
  );
};

export default PlannerPage;
