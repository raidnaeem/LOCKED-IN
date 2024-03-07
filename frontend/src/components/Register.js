import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import RegisterUI from './RegisterUI';
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

        var obj_register = 
        {
          Email: registerEmail.value, 
          Password: registerPassword.value, 
          FirstName: registerFName.value, 
          LastName: registerLName.value
        };
        var js_register = JSON.stringify(obj_register);

        try
        {    
            const response = await fetch(bp.buildPath('api/register'), {
              method:'POST',
              body:js_register,
              headers:{'Content-Type': 'application/json'}
            });

            var res = JSON.parse(await response.text());

            if( response.status === 200)
            {
                var user =
                {
                  FirstName:res.FirstName,
                  LastName:res.LastName,
                  //UserID:res.UserID
                };
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
      <div id="registerDIV">
            {/* Use the RegisterUI component here */}

            <form onSubmit={doRegister}>
                <span id="inner-title">PLEASE SIGN UP</span>
                <br />
                <input
                    type="text"
                    id="registerFName"
                    placeholder="First Name"
                    ref={(c) => (registerFName = c)}
                />
                <br />
                <input
                    type="text"
                    id="registerLName"
                    placeholder="Last Name"
                    ref={(c) => (registerLName = c)}
                />
                <br />
                <input
                    type="text"
                    id="registerEmail"
                    placeholder="Email"
                    ref={(c) => (registerEmail = c)}
                />
                <br />
                <input
                    type="password"
                    id="registerPassword"
                    placeholder="Password"
                    ref={(c) => (registerPassword = c)}
                />
                <br />
                <input
                    type="submit"
                    id="registerButton"
                    className="buttons"
                    value="Register"
                    onClick={doRegister}
                />
            </form>
            <span id="registerResult">{registerMessage}</span>
        </div>
    );
};

export default Register;