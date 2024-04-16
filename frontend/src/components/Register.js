import React, { useState } from 'react';
import { useJwt } from "react-jwt";
import RegisterUI from './RegisterUI';
import VerificationPopup from './VerificationPopup.jsx';
var bp = require('./Path.js');

function Register() {

    const [registerFName,setRegisterFName] = useState('');
    const [registerLName,setRegisterLName] = useState('');
    const [registerEmail,setRegisterEmail] = useState('');
    const [registerPassword,setRegisterPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [registerMessage,setMessage] = useState('');

    const doRegister = async event => 
    {
        event.preventDefault();
        
        //Form validation goes here, for now only password matching check
        if(registerPassword !== confirmPassword)
        {
            setMessage('Password do not match!');
            return;
        }

        // Password validation rules
        const passwordErrors = [];

        // Check length
        if (registerPassword.length < 10) {
            passwordErrors.push('Password must be at least 10 characters long');
        }

        // Check for uppercase letter
        if (!/[A-Z]/.test(registerPassword)) {
            passwordErrors.push('Password must contain an uppercase letter');
        }

        // Check for special character
        if (!/[!@#$%^&*]/.test(registerPassword)) {
            passwordErrors.push('Password must contain a special character (!@#$%^&*)');
        }

        // If there are multiple errors, combine them into a single message
        if (passwordErrors.length > 0) {
            setMessage(passwordErrors.join('\n'));
            return;
        }

        var obj_register = 
        {
            Email: registerEmail, 
            Password: registerPassword, 
            FirstName: registerFName, 
            LastName: registerLName
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

                setMessage('');
                //Alert user to check email for verification
                const verifyNotif = document.getElementById("verifyNotification");
                verifyNotif.style.display = 'block';
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
            <VerificationPopup/>
            {/* Use the RegisterUI component here */}
            <RegisterUI
                doRegister={doRegister}
                setRegisterFName={setRegisterFName}
                setRegisterLName={setRegisterLName}
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                setConfirmPassword={setConfirmPassword}
                registerMessage={registerMessage}
            />
        </div>
    );
};

export default Register;