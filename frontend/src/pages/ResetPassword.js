import React from 'react';
import {useParams} from "react-router-dom";
import {Button} from '@chakra-ui/react';

import PageTitle from '../components/PageTitle';
import GeneralBackground from '../components/GeneralBackground';
import ResetPasswordRedirect from '../components/ResetPasswordRedirect'

const ResetPasswordPage = () =>
{
    let { passwordResetToken } = useParams();

    return(
      <div>
        <GeneralBackground />
        <ResetPasswordRedirect passwordResetToken={passwordResetToken}/>

      </div>
    );
};

export default ResetPasswordPage;