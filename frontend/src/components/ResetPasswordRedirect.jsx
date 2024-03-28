import React, { useState, useEffect, useRef } from 'react';
import bp from './Path.js'; 
import { Input, InputLeftElement, InputGroup, Stack, InputRightElement, Button} from '@chakra-ui/react';
const logo = require('../assets/locked-in-logo.png')
const userIcon = require('../assets/user-icon.png')
const passwordIcon = require('../assets/password-icon.png')
const emailIcon = require('../assets/email-icon.png')

function ResetPasswordRedirect ({ passwordResetToken }) {
    const commonTextStyle = {
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
    };

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const resetPassword = async event => {
        event.preventDefault();

        if(password !== confirmPassword)
        {
            setMessage('Password do not match!');
            return;
        }

        var obj_passwordReset = 
        { 
            newPassword: password
        };
        obj_passwordReset = JSON.stringify(obj_passwordReset);

        try {
            //Calls Reset Password Endpoint
            const response = await fetch(bp.buildPath(`api/reset-password/${passwordResetToken}`), {
                method: 'POST',
                body: obj_passwordReset,
                headers:{'Content-Type': 'application/json'}
            });

            const res = await response.text();

            //Success
            if(response.status === 200){
                setMessage(res);
            } else {
                setMessage(res);
            }


        } catch (e) {
            alert(e.toString());
        }
    }

    return (
        <div>
            <div className="flex justify-center">
            <div className="sm:w-4/5 p-4 relative max-w-[800px]">

                {/*Rectangles*/}
                <div className="bg-blue relative z-10 top-10 left-12 h-[450px] max-w-[1200px] rounded" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>
                <div className="bg-white relative z-10 bottom-3 right-3 h-[450px] max-w-[1200px] flex flex-col justify-start items-center rounded" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>

                    <div className="text-slate-600 w-full text-center text-xl p-10" style={{commonTextStyle}}>Enter a new password for your account</div>
                    <form onSubmit={resetPassword} className='text-center'>
                    <InputGroup className='mb-2'>
                        <InputLeftElement pointerEvents='none'>
                            <img src={passwordIcon} className='relative top-1' alt='Password Icon'></img>
                        </InputLeftElement>
                        <Input bg='gray.200' width='340px' height='50px'
                            type={show ? 'text' : 'password'}
                            placeholder='Password'
                            id="newPassword"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement>
                            <Button className="relative top-1 right-1" h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup className='mb-2'>
                        <InputLeftElement pointerEvents='none'>
                            <img src={passwordIcon} className='relative top-1' alt='Password Icon'></img>
                        </InputLeftElement>
                        <Input bg='gray.200' width='340px' height='50px'
                            type='password'
                            placeholder='Confirm Password'
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </InputGroup>
                        <Button bgColor='#667EEA' textColor='white' height='50px' fontSize='20px' styles={[commonTextStyle]}
                            type='submit'
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#2f55fa';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#667EEA';
                            }}
                            onMouseDown={(e) => {
                                e.target.style.backgroundColor = '#203dbd';
                            }}
                            onMouseUp={(e) => {
                                e.target.style.backgroundColor = '#2f55fa';
                            }}
                        >
                            Reset Password
                        </Button>

                        {/*Register Feedback Message*/}
                        <div id="requestResult" className='text-center text-red-600 text-md p-2' style={{commonTextStyle}}>{message}</div>
                    </form>

                    {/*Navigate to Login*/}
                    <Button 
                        className='mt-7 p-6'
                        style={{background: 'white', border: '1px #4A5568 solid', commonTextStyle, fontSize: 24}}
                        onClick={() => window.location.href = '/'}
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
                </div>
            </div>
            </div>
        </div>
    );

}

export default ResetPasswordRedirect