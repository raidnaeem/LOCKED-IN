import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';

const PlannerPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
        </div>
    );
}

export default PlannerPage;
