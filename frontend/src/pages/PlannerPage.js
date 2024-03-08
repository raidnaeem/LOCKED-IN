import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';

const PlannerPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <div id='temp' style={{textAlign: 'center', marginTop: '10%'}}>
                <p style={{fontWeight: 'bold', fontSize: 35}}>
                    Temporary page after signing in 
                </p>
            </div>
        </div>
    );
}

export default PlannerPage;
