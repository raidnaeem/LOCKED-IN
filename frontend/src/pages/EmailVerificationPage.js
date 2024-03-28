import React from 'react';
import {useParams} from "react-router-dom";
import {Button} from '@chakra-ui/react';

import GeneralBackground from '../components/GeneralBackground';
import EmailVerification from '../components/EmailVerification';

const EmailVerificationPage = () =>
{
    let { verificationToken } = useParams();

    return(
      <div>
        <GeneralBackground />
        <EmailVerification 
            verificationToken={verificationToken}
        />
        
      </div>
    );
};

export default EmailVerificationPage;