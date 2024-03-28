import React from 'react';
import { Input, InputLeftElement, InputGroup, Stack, InputRightElement, Button} from '@chakra-ui/react';
const logo = require('../assets/lock-logo.png')
const userIcon = require('../assets/user-icon.png')
const passwordIcon = require('../assets/password-icon.png')

const LoginUI = ({ doLogin, setLoginEmail, setLoginPassword, loginMessage }) => {
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
            <div className="bg-blue relative z-10 top-10 left-12 h-[550px] max-w-lg" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>
            <div className="bg-white relative z-10 bottom-3 right-3 h-[550px] max-w-lg flex flex-col justify-start items-center" style={{boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }}>

            {/*Heading*/}
            <img className="w-[80px] h-[100px] relative z-20 -top-5" src={logo} alt='logo'/>
            <div className="text-blue w-full text-center text-4xl pb-2 font-bold" style={{ commonTextStyle}}>Login</div>
            <div className="text-slate-600 w-full text-center text-lg pb-6" style={{commonTextStyle}}>Sign in to your account</div>

            {/*Login Form*/}
            <form onSubmit={doLogin}>
            <Stack spacing={4}>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <img src={userIcon} className='relative top-1' alt='User Icon'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' width='340px' height='50px'
                        type='email'
                        placeholder='Email'
                        id="loginEmail"
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <img src={passwordIcon} className='relative top-1' alt='Password Icon'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' width='340px' height='50px'
                        type={show ? 'text' : 'password'}
                        placeholder='Password'
                        id="loginPassword"
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button className="relative top-1 right-1" h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
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
                    id="loginButton"
                    className="buttons"
                    >
                    Login
                </Button>
            </Stack>
                {/*Login Feedback Message*/}
                <div id="loginResult" className='text-center text-red-600 text-xl p-2' style={{commonTextStyle}}>{loginMessage}</div>
            </form>

            {/*Forgot Password*/}
            <a className='mt-1 text-[#0000FF]' style={{commonTextStyle}}
            onMouseEnter={(e) => {
                e.target.style.fontStyle = 'italic';
            }}
            onMouseLeave={(e) => {
                e.target.style.fontStyle = 'normal';
            }}
            href='./passwordReset'
            >
                Forgot password? Click here to reset
            </a>


            {/*Navigate to Register*/}
            <Button 
                className='mt-10 p-6'
                style={{background: 'white', border: '1px #4A5568 solid', commonTextStyle, fontSize: 24}}
                onClick={() => window.location.href = './register'}
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
                Register New Account
            </Button>

            </div>
            </div>
            </div>

            </div>
            </div>
    );
};

export default LoginUI;
