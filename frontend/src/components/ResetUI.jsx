import React, { useState } from 'react';
import { Input, InputLeftElement, InputGroup, Button} from '@chakra-ui/react';
const emailIcon = require('../assets/email-icon.png')
var bp = require('./Path.js');


function ResetUI()
{
    const commonTextStyle = {
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
    };

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const requestReset = async (event) => {
        event.preventDefault();

        var obj_requestReset = 
        { 
            Email: email
        };
        var obj_requestReset = JSON.stringify(obj_requestReset);

        try {
            //Password Request Reset API endpoint call
            const response = await fetch(bp.buildPath('api/request-password-reset'), {
                method: 'POST',
                body: obj_requestReset,
                headers: { 'Content-Type': 'application/json' },
            });

            var res = await response.text();

            //Success
            if (response.status === 200) {
                setMessage(res);
                console.log('test');
            } else {
                setMessage(res);
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

   return(
        <div>
            <div className="flex justify-center">
            <div className="sm:w-4/5 p-4 relative max-w-[800px]">

                {/*Rectangles*/}
                <div className="bg-blue relative z-10 top-10 left-12 h-[450px] max-w-[1200px] rounded" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>
                <div className="bg-white relative z-10 bottom-3 right-3 h-[450px] max-w-[1200px] flex flex-col justify-start items-center rounded" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>

                    <div className="text-slate-600 w-full text-center text-xl p-10" style={{commonTextStyle}}>Enter your email to reset your password</div>
                    <form onSubmit={requestReset}>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none'>
                                <img src={emailIcon} className='relative top-1 h-[18px]' alt='User Icon'></img>
                            </InputLeftElement>
                            <Input bg='gray.200' width='300px' height='50px'
                                type='email'
                                placeholder='Email'
                                id="registerFName"
                                className='mb-10'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <Button bgColor='#667EEA' textColor='white' height='50px' fontSize='20px' styles={[commonTextStyle]}
                            type='submit'
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#4a5568';
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#667EEA';
                                e.target.style.color = 'white';
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
                            Request Password Reset
                        </Button>

                        {/*Register Feedback Message*/}
                        <div id="requestResult" className='text-center text-red-600 text-md p-2' style={{commonTextStyle}}>{message}</div>
                    </form>

                    {/*Navigate to Login*/}
                    <Button 
                        className='mt-5 p-6'
                        style={{background: 'white', border: '1px #4A5568 solid', commonTextStyle, fontSize: 24}}
                        onClick={() => window.location.href = './'}
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
};

export default ResetUI;
