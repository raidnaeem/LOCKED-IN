import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";
import LoginUI from './LoginUI'; // Import the LoginUI component
var bp = require('./Path.js');

function Login() {
    const storage = require('../tokenStorage.js');

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
                //If email verified, navigate to Planner page
                console.log(res);
                if(res.verified === true) {
                    storage.storeToken(res);

                    // Decode the token without using jsonwebtoken library
                    const ud = jwtDecode(storage.retrieveToken());

                    var user =
                    { 
                        FirstName: ud.FirstName, 
                        LastName: ud.LastName, 
                        UserID: ud.UserID 
                    };
                    localStorage.setItem('user_data', JSON.stringify(user));

                    setMessage('');
                    window.location.href = '/planner';
                }
                else
                {
                    setMessage('Please verify your email to login!');
                }
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
                setLoginEmail={setLoginEmail}
                setLoginPassword={setLoginPassword}
                loginMessage={loginMessage}
            />
        </div>
    );
}

export default Login;