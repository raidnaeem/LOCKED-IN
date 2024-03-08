import React from 'react';

function LoggedInName()
{
	
    var _ud = localStorage.getItem('user_data');
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
    <div id="loggedInDiv" style={{textAlign: 'right', paddingRight: '3%', position: 'relative'}}>
      <div id="userName">
        Welcome, {firstName} {lastName}
      </div>
      <br />

      <button type="button" id="logoutButton" class="buttons" 
        onClick={doLogout}> Log Out
      </button>
   </div>
  );

};

export default LoggedInName;
