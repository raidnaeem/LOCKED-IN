import React from 'react';
const logo = require('../assets/locked-in-logo.png')

const RegisterUI = (doRegister, setRegisterFName, setRegisterLName, setRegisterEmail, setRegisterPassword, registerMessage) => {
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


                <div style={{width: 439.37, height: 53.50, left: 372, top: 248, position: 'absolute', background: '#EDF2F7'}} />
                <div style={{width: 439.37, height: 53.50, left: 372, top: 466, position: 'absolute', background: '#EDF2F7'}} />
                <div style={{width: 439.37, height: 2, left: 372, top: 519.07, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />
                <div style={{width: 439.37, height: 53.50, left: 372, top: 572, position: 'absolute', background: '#667EEA'}} />
                <div style={{width: 439.37, height: 53.50, left: 375, top: 642, position: 'absolute', background: 'white', border: '1px #4A5568 solid'}} />
                <div style={{width: 439, height: 2, left: 375, top: 302.11, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}}></div>
                <div style={{width: 89.40, height: 22.47, left: 429, top: 264, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>First Name</div>
                <div style={{width: 100, height: 100, left: 520, top: 301, position: 'absolute'}} />
                <div style={{width: 87.22, height: 22.47, left: 429, top: 484, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Password</div>
                <div style={{left: 547, top: 585, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Register</div>
                <div style={{width: 202.79, height: 53.50, left: 973.21, top: 0, position: 'absolute', background: '#667EEA'}} />
                <div style={{width: 202.79, height: 53.50, left: 749.71, top: 0, position: 'absolute', background: '#4A5568'}} />
                <div style={{width: 439, height: 2, left: 372, top: 374, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />
                <div style={{width: 439.37, height: 53.50, left: 374, top: 319, position: 'absolute', background: '#EDF2F7'}} />
                <div style={{width: 89.40, height: 22.47, left: 431, top: 335, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Last Name</div>
                <div style={{width: 60, left: 1045, top: 11, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Login</div>
                <div style={{width: 200, left: 775, top: 13, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Back to Home</div>
                <div style={{width: 439, left: 460, top: 656, position: 'absolute', color: '#4A5568', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word'}}>Have an account? Sign in</div>
                <div style={{width: 439, height: 2, left: 372, top: 302, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />
                <div style={{width: 439.37, height: 2, left: 374, top: 448, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)'}} />
                <div style={{width: 439.37, height: 53.50, left: 374, top: 393, position: 'absolute', background: '#EDF2F7'}} />
                <div style={{width: 54, height: 22, left: 429, top: 409, position: 'absolute', color: 'rgba(0, 0, 0, 0.50)', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word'}}>Email</div>
                <div style={{width: 65, height: 68, left: 0, top: 583, position: 'absolute'}} />
                <div style={{width: 14.17, height: 17.12, left: 394, top: 341, position: 'absolute'}} />
                
                {/*Icons for form fields*/}
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

            </div>
        </div>
    );
};

export default RegisterUI;