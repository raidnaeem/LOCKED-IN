import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import LoginUI from './LoginUI'; // Import the LoginUI component
var bp = require('./Path.js');

function Login() {

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [loginMessage, setMessage] = useState('');

    const doLogin = async (event) => {
        event.preventDefault();

        var obj_login = 
        { 
          Email: loginEmail, 
          Password: loginPassword
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
            <LoginUI
                doLogin={doLogin}
                loginEmail={loginEmail}
                setLoginEmail={setLoginEmail}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
            />

            <span id="loginResult" style={{ position: 'absolute', top: 600, left: 180, color: 'red', fontSize: '16px' }}>{loginMessage}</span>
        </div>
    );
}

export default Login;