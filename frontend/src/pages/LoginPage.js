import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{

    return(
      <div>
        <div className='font-poppins font-bold text-6xl text-center m-7 text-[#EA7331]'>
            Locked In
        </div>
        <Login />
      </div>
    );
};

export default LoginPage;
