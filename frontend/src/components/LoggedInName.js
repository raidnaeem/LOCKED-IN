import React from 'react';

function LoggedInName()
{
	
    var _ud = localStorage.getItem('user_data');

    //If no local user data, then redirect user to login page
    if(_ud == null) {
      window.location.href = '/';
    }

    var ud = JSON.parse(_ud);
    var userId = ud.UserID;
    var firstName = ud.FirstName;
    var lastName = ud.LastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };    

  return(
    <div id="loggedInDiv" style={{textAlign: 'right', paddingRight: '3%', position: 'relative'}}>
      <div id="userName">
        Welcome, {firstName} {lastName}
      </div>
      <br />

      <button type="button" id="logoutButton" className="buttons" 
        onClick={doLogout}> Log Out
      </button>
   </div>
  );

};

export default LoggedInName;
