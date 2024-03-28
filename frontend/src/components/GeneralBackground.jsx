import React from 'react';
import {Button} from '@chakra-ui/react';
import PageTitle from './PageTitle';

function GeneralBackground()
{

   return(
       
        <div className='relative flex items-center justify-between'>
            <PageTitle/>
            {/*Blue background*/}
            <div className="bg-blue -z-10 w-full h-1/2 absolute bottom-1/2 opacity-30">
            </div>
            {/*Navigate to Login*/}
            <Button 
                  className='absolute m-10 p-6'
                  style={{background: 'white', border: '1px #4A5568 solid', fontSize: 24}}
                  onClick={() => window.location.href = ''}
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

export default GeneralBackground;
