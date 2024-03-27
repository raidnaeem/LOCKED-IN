import React from 'react';
import {useParams} from "react-router-dom";

import PageTitle from '../components/PageTitle';
import GeneralBackground from '../components/GeneralBackground';
import EmailVerification from '../components/EmailVerification';

const EmailVerificationPage = () =>
{
    let { verificationToken } = useParams();

    return(
      <div>
        <PageTitle/>
        <GeneralBackground />
        <EmailVerification 
            verificationToken={verificationToken}
        />
      </div>
    );
};

export default EmailVerificationPage;