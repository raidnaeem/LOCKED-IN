import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import LoginUI from './LoginUI'; // Import the LoginUI component
var bp = require('./Path.js');

function Login() {
    var loginEmail;
    var loginPassword;

    const [loginMessage, setMessage] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();

        var obj_login = 
        { 
          Email: loginEmail.value, 
          Password: loginPassword.value 
        };
        var js_login = JSON.stringify(obj_login);

        try {
            //Login API endpoint call
            const response = await fetch(bp.buildPath('api/login'), {
                method: 'POST',
                body: js_login,
                headers: { 'Content-Type': 'application/json' },
            });

            var res = JSON.parse(await response.text());

            //Success
            if (response.status === 200) {
              var user =
              { 
                FirstName: res.FirstName, 
                LastName: res.LastName, 
                //UserID: res.UserID 
              };
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/planner';
            } else {
                setMessage(res.error);
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <div id="loginDiv">
            {/* Use the LoginUI component here */}
            <LoginUI />

            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span>
                <br />
                <input
                    type="text"
                    id="loginEmail"
                    placeholder="Email"
                    ref={(c) => (loginEmail = c)}
                />
                <br />
                <input
                    type="password"
                    id="loginPassword"
                    placeholder="Password"
                    ref={(c) => (loginPassword = c)}
                />
                <br />
                <input
                    type="submit"
                    id="loginButton"
                    className="buttons"
                    value="Login"
                    onClick={doLogin}
                />
            </form>
            <span id="loginResult">{loginMessage}</span>
        </div>
    );
}

export default Login;