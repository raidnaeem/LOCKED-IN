import React from 'react';

import PageTitle from '../components/PageTitle';
import Register from '../components/Register';

const RegisterPage = () =>
{

    return(
      <div>
        <div className='font-poppins font-bold text-6xl text-center m-7 text-[#EA7331]'>
            Locked In
        </div>
        <Register />
      </div>
    );
};

export default RegisterPage;