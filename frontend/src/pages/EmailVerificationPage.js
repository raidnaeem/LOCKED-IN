import React from 'react';
import {useParams} from "react-router-dom";
import {Button} from '@chakra-ui/react';

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

        {/*Navigate to Register*/}
        <Button 
                className='mt-10 p-6'
                style={{background: 'white', border: '1px #4A5568 solid', fontSize: 24}}
                onClick={() => window.location.href = '/'}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#4a5568';
                    e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#4a5568';
                }}
                onMouseDown={(e) => {
                    e.target.style.backgroundColor = 'black';
                    e.target.style.color = 'white';
                }}
                onMouseUp={(e) => {
                    e.target.style.backgroundColor = '#4a5568';
                    e.target.style.color = 'white';
                }}
                >
                Back to Login
            </Button>
      </div>
    );
};

export default EmailVerificationPage;