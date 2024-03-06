import React, { useState } from 'react';
import { useJwt } from "react-jwt";
var bp = require('./Path.js');

//Not complete, just basically copied format for login
function Register()
{
    var registerFName;
    var registerLName;
    var registerEmail;
    var registerPassword;

    const [registerMessage,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();

        var obj = {Email:registerEmail.value,Password:registerPassword.value,FirstName:registerFName,LastName:registerLName};
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/register'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.status == 200)
            {
                var user = {FirstName:res.FirstName,LastName:res.LastName,UserID:res.UserID}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage(res.message);
                window.location.href = '/planner';
            }
            else
            {
                setMessage(res.error);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
      <div id="registerDiv">
        <form onSubmit={doRegister}>
        <span id="inner-title">PLEASE SIGN UP</span><br />
        <input type="text" id="registerFName" placeholder="First Name" 
          ref={(c) => registerFName = c} /><br />
          <input type="text" id="registerLName" placeholder="Last Name" 
          ref={(c) => registerLName = c} /><br />
        <input type="text" id="registerEmail" placeholder="Email" 
          ref={(c) => registerEmail = c} /><br />
        <input type="password" id="registerPassword" placeholder="Password" 
          ref={(c) => registerPassword = c} /><br />
        <input type="submit" id="registerButton" class="buttons" value = "Do It"
          onClick={doRegister} />
        </form>
        <span id="registerResult">{registerMessage}</span>
     </div>
    );
};

export default Register;