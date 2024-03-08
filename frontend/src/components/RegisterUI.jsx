import React from 'react';
const logo = require('../assets/locked-in-logo.png')
const userIcon = require('../assets/user-icon.png')
const passwordIcon = require('../assets/password-icon.png')
const emailIcon = require('../assets/email-icon.png')

const RegisterUI = ({doRegister, setRegisterFName, setRegisterLName, setRegisterEmail, setRegisterPassword, registerMessage}) => {
    const commonTextStyle = {
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
    };

    return (
        <div style={{ position: 'absolute', left: '8%', top: '0%', transform: 'translate(-50%, -50%)' }}>
            <div style={{width: '80%', maxWidth: '600px', position: 'relative'}}>
                <div style={{width: 584, height: 250, left: 282, top: 99, position: 'absolute', background: '#EDF2F7'}} />
                <div style={{width: 490.61, height: 600, left: 360.50, top: 130.53, position: 'absolute', background: '#667EEA', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)'}} />
                <div style={{width: 490.61, height: 600, left: 347, top: 123, position: 'absolute', background: 'white', boxShadow: '6px 0px 12px rgba(0, 0, 0, 0.12)'}} />

                {/*Heading*/}
                <img style={{width: 80, height: 80, left: 552, top: 105, position: 'absolute'}} src={logo} alt='logo'/>
                <div style={{...commonTextStyle, left: 527, top: 180, position: 'absolute', color: '#667EEA', fontSize: 36, fontWeight: '700', width: 200}}>Register</div>
                <div style={{...commonTextStyle, left: 510, top: 226, position: 'absolute', color: '#4A5568', fontSize: 18, fontWeight: '400', width: 200}}>Register your account today</div>

                {/*Form Fields*/}
                <form onSubmit={doRegister}>
                    <div style={{width: 439.37, height: 53.50, left: 372, top: 248, position: 'absolute', background: '#EDF2F7'}}>
                        <input
                            type="text"
                            style={{ width: 350, height: 53, left: 0, top: 0, paddingLeft: 45, paddingRight: 45, position: 'relative', color: 'rgba(0, 0, 0, 0.80)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="registerFName"
                            placeholder="First Name"
                            onChange={(e) => setRegisterFName(e.target.value)}
                        />
                    </div>
                    <div style={{width: 439, height: 2, left: 375, top: 302.11, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}}></div>

                    <div style={{width: 439.37, height: 53.50, left: 374, top: 319, position: 'absolute', background: '#EDF2F7'}}>
                        <input
                            type="text"
                            style={{ width: 350, height: 53, left: 0, top: 0, paddingLeft: 45, paddingRight: 45, position: 'relative', color: 'rgba(0, 0, 0, 0.80)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="registerLName"
                            placeholder="Last Name"
                            onChange={(e) => setRegisterLName(e.target.value)}
                        />
                    </div>
                    <div style={{width: 439, height: 2, left: 372, top: 374, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />

                    <div style={{width: 439.37, height: 53.50, left: 374, top: 393, position: 'absolute', background: '#EDF2F7'}}>
                        <input
                            type="text"
                            style={{ width: 350, height: 53, left: 0, top: 0, paddingLeft: 45, paddingRight: 45, position: 'relative', color: 'rgba(0, 0, 0, 0.80)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="registerEmail"
                            placeholder="Email"
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                    </div>
                    <div style={{width: 439.37, height: 2, left: 374, top: 448, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />

                    <div style={{width: 439.37, height: 53.50, left: 372, top: 466, position: 'absolute', background: '#EDF2F7'}}>
                        <input
                            type="password"
                            style={{ width: 350, height: 53, left: 0, top: 0, paddingLeft: 45, paddingRight: 45, position: 'relative', color: 'rgba(0, 0, 0, 0.80)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="registerPassword"
                            placeholder="Password"
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                    </div>
                    <div style={{width: 439.37, height: 2, left: 372, top: 519.07, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />

                    <div style={{width: 439.37, height: 53.50, left: 372, top: 572, position: 'absolute', background: '#667EEA'}}>
                        <input
                            type="submit"
                            style={{
                                width: 439.37, height: 53.30, background: '#667EEA', position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word',
                                borderWidth:0
                            }}
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
                            value="Register"
                        />
                    </div>
                </form>

                {/*Login Feedback Message*/}
                <div id="registerResult" style={{ position: 'absolute', width:400, height:40, top: 530, left: 400, color: 'red', fontSize: '16px', textAlign: 'center'}}>{registerMessage}</div>

                {/*Icons for form fields*/}
                <img style={{ width: 14.17, height: 17.12, left: 390, top: 266, position: 'absolute' }} src={userIcon} alt='userIcon'/>
                <img style={{ width: 14.17, height: 17.12, left: 390, top: 337, position: 'absolute' }} src={userIcon} alt='userIcon'/>
                <img style={{ width: 24, height: 17.6, left: 386, top: 411, position: 'absolute' }} src={emailIcon} alt='emailIcon'/>
                <img style={{ width: 23.99, height: 23.54, left: 387, top: 484, position: 'absolute' }} src={passwordIcon} alt='passwordIcon'/>

                { /*
                <div style={{width: 14.17, height: 17.12, left: 392, top: 266, position: 'absolute'}}>
                    <div style={{width: 14.17, height: 17.12, left: 0, top: 0, position: 'absolute'}}>
                        <div style={{width: 8.10, height: 8.56, left: 3.04, top: -0, position: 'absolute', opacity: 0.40, background: 'rgba(0, 0, 0, 0.50)'}}></div>
                        <div style={{width: 14.17, height: 7.49, left: 0, top: 9.63, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)'}}></div>
                    </div>
                </div>
                <div style={{width: 14.17, height: 17.12, left: 392, top: 337, position: 'absolute'}}>
                    <div style={{width: 8.10, height: 8.56, left: 3.04, top: 0, position: 'absolute', opacity: 0.40, background: 'rgba(0, 0, 0, 0.50)'}}></div>
                    <div style={{width: 14.17, height: 7.49, left: 0, top: 9.63, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)'}}></div>
                </div>
                <div style={{width: 30, height: 22, left: 384, top: 409, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)'}}></div>
                <div style={{width: 23.99, height: 23.54, left: 387, top: 484, position: 'absolute'}}>
                    <div style={{width: 16.35, height: 16.05, left: 1.64, top: 3.21, position: 'absolute'}}>
                        <div style={{width: 9.68, height: 8.81, left: -0, top: 7.24, position: 'absolute', opacity: 0.40, background: 'rgba(0, 0, 0, 0.50)'}}></div>
                        <div style={{width: 11.24, height: 11.03, left: 5.11, top: 0, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)'}}></div>
                    </div>
                </div>
                */}   

                {/*Navigate to LoginPage*/}
                <button 
                    style={{ width: 439.37, height: 53.50, left: 375, top: 642, position: 'absolute', background: 'white', border: '1px #4A5568 solid', ...commonTextStyle, fontSize: 24, color: '#4A5568', fontWeight: '500'}}
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
                </button>

                {/*Misc*/}
                <div style={{width: 100, height: 100, left: 520, top: 301, position: 'absolute'}} />
                <div style={{width: 202.79, height: 53.50, left: 973.21, top: 0, position: 'absolute', background: '#667EEA'}} />
                <div style={{width: 202.79, height: 53.50, left: 749.71, top: 0, position: 'absolute', background: '#4A5568'}} />


                <div style={{width: 60, left: 1045, top: 11, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Login</div>
                <div style={{width: 200, left: 775, top: 13, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Back to Home</div>
                <div style={{width: 439, height: 2, left: 372, top: 302, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />
                <div style={{width: 65, height: 68, left: 0, top: 583, position: 'absolute'}} />
                <div style={{width: 14.17, height: 17.12, left: 394, top: 341, position: 'absolute'}} />
            </div>
        </div>
    );
};

export default RegisterUI;