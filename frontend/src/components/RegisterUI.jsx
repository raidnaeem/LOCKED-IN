import React from 'react';
import { Input, InputLeftElement, InputGroup, Stack, InputRightElement, Button} from '@chakra-ui/react';
const logo = require('../assets/lock-logo.png')
const userIcon = require('../assets/user-icon.png')
const passwordIcon = require('../assets/password-icon.png')
const emailIcon = require('../assets/email-icon.png')

const RegisterUI = ({doRegister, setRegisterFName, setRegisterLName, setRegisterEmail, setRegisterPassword, setConfirmPassword, registerMessage}) => {
    const commonTextStyle = {
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
    };

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    return (
        <div className="flex justify-center">
        <div className="sm:w-4/5 p-4 relative max-w-[600px]">
        
        {/*Rectangles*/}
        <div className="bg-gray relative w-full h-[250px]">
        <div className="bg-blue relative z-10 top-10 left-12 h-[620px] max-w-lg" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>
        <div className="bg-white relative z-10 bottom-3 right-3 h-[620px] max-w-lg flex flex-col justify-start items-center" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>

        {/*Heading*/}
        <img className="w-[80px] h-[120px] relative z-20 -top-5" src={logo} alt='logo'/>
        <div className="text-blue w-full text-center text-4xl pb-2 font-bold" style={{ commonTextStyle}}>Register</div>
        <div className="text-slate-600 w-full text-center text-lg pb-6" style={{commonTextStyle}}>Register your account today</div>

        {/*Register Form*/}
        <form onSubmit={doRegister}>
        <Stack spacing={4}>
            <Stack spacing={4} direction='row'>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <img src={userIcon} className='relative top-1' alt='User Icon'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' width='160px' height='50px'
                        type='text'
                        placeholder='First Name'
                        id="registerFName"
                        onChange={(e) => setRegisterFName(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <img src={userIcon} className='relative top-1' alt='User Icon'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' width='160px' height='50px'
                        type='text'
                        placeholder='Last Name'
                        id="registerLName"
                        onChange={(e) => setRegisterLName(e.target.value)}
                    />
                </InputGroup>
            </Stack>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <img src={emailIcon} className='relative top-[6px] w-[20px]' alt='Email Icon'></img>
                </InputLeftElement>
                <Input bg='gray.200' width='340px' height='50px'
                    type='email'
                    placeholder='Email'
                    id="registerEmail"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                />
            </InputGroup>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <img src={passwordIcon} className='relative top-1' alt='Password Icon'></img>
                </InputLeftElement>
                <Input bg='gray.200' width='340px' height='50px'
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    id="registerPassword"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                />
                <InputRightElement>
                    <Button className="relative top-1 right-1" h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <InputGroup>
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
            <Button bgColor='#667EEA' textColor='white' height='50px' fontSize='24px' styles={[commonTextStyle]}
                type="submit"
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
                id="registerButton"
                className="buttons"
                >
                Register
            </Button>
        </Stack>
            {/*Register Feedback Message*/}
            <div id="registerResult" className='text-center text-red-600 text-md p-2 h-16' style={{commonTextStyle}}>{registerMessage}</div>
        </form>

        {/*Navigate to Login*/}
        <Button 
            className='mt-5 p-6'
            style={{background: 'white', border: '1px #4A5568 solid', commonTextStyle, fontSize: 24, marginTop: '-5px'}}
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
            Have an account? Sign in
        </Button>

        </div>
        </div>
        </div>

        </div>
        </div>
    );
};

export default RegisterUI;