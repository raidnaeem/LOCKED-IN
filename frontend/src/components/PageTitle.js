import React from 'react';
import NavigationTabs from './NavigationTabs';
import Logo from '../assets/lock-logo.png'

function PageTitle()
{
   return(
      <div className='flex items-center'>
         <h1 className='text-4xl flex font-bold italic p-5 hidden md:block'>
            Locked In
         </h1>
         <img width='40' height='40' src={Logo} alt='Locked In Logo'/>
      </div>
   );
};

export default PageTitle;
