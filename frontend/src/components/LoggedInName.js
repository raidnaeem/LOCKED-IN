import React from 'react';
import { Button } from '@chakra-ui/react';

function LoggedIn()
{
	
    var _ud = localStorage.getItem('user_data');

    //If no local user data, then redirect user to login page
    if(_ud == null) {
      window.location.href = '/';
    }

    var ud = JSON.parse(_ud);
    //var userId = ud.UserID;
    var firstName = ud.FirstName;
    var lastName = ud.LastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
    <div id="loggedInDiv" className='p-3 text-right relative w-full'>
      <div id="userName" className='mb-2 text-lg'>
        Locked In as, {firstName} {lastName}
      </div>
      <Button type="button" id="logoutButton" className="right-5" colorScheme='red'
        onClick={doLogout}> Log Out
      </Button>
   </div>
  );

};

export default LoggedIn;
