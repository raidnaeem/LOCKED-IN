import React from 'react';

const LoginUI = ({ doLogin, loginEmail, setLoginEmail, loginPassword, setLoginPassword }) => {
    const commonTextStyle = {
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
    };

    return (
        <div style={{ position: 'absolute', left: '20%', top: '5%', transform: 'translate(-50%, -50%)' }}>
            <div style={{ width: '80%', maxWidth: '600px', position: 'relative' }}>
                <div style={{ width: 584, height: 247, left: 0, top: 99, position: 'absolute', background: '#EDF2F7' }} />
                <div style={{ width: 490.61, height: 542.47, left: 78.50, top: 130.53, position: 'absolute', background: '#667EEA', boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)' }} />
                <div style={{ width: 490.61, height: 542.47, left: 67.60, top: 119.83, position: 'absolute', background: 'white', boxShadow: '6px 0px 12px rgba(0, 0, 0, 0.12)' }} />

                {/*Heading*/}
                <img style={{ width: 79.59, height: 53.50, left: 270.38, top: 153, position: 'absolute' }} src="../assets/locked-in-logo.png" alt='logo'/>
                <div style={{ ...commonTextStyle, fontSize: 36, color: '#667EEA', fontWeight: '700', width: 99.21, height: 44.94, left: 261.66, top: 219.34, position: 'absolute' }}>Login</div>
                <div style={{ ...commonTextStyle, fontSize: 18, color: '#4A5568', fontWeight: '400', width: 199.51, height: 22.47, left: 211.51, top: 267.49, position: 'absolute' }}>Sign in to your account</div>

                {/*Login Form*/}
                <form onSubmit={doLogin}>
                    <div style={{ width: 439.37, height: 53.50, left: 92.67, top: 316.71, position: 'absolute', background: '#EDF2F7' }}>
                        <input
                            type="text"
                            style={{ width: 350, height: 35, left: 50, top: 10, position: 'relative', color: 'rgba(0, 0, 0, 0.50)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="loginEmail"
                            placeholder="Email"
                            onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>

                    <div style={{ width: 439.37, height: 53.50, left: 92.67, top: 388.39, position: 'absolute', background: '#EDF2F7' }}>
                        <input
                            type="password"
                            style={{ width: 350, height: 35, left: 50, top: 10, position: 'relative', color: 'rgba(0, 0, 0, 0.50)', background: '#EDF2F7', fontSize: 18, fontFamily: 'Roboto', fontWeight: '400', wordWrap: 'break-word', border:0 }}
                            id="loginPassword"
                            placeholder="Password"
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>

                    <div style={{ width: 439.37, height: 53.50, left: 92.67, top: 466.50, position: 'absolute', background: '#667EEA' }}>
                        <input
                            type="submit"
                            style={{ width: 439.37, height: 53.30, background: '#667EEA', position: 'absolute', color: 'white', fontSize: 18, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}
                            id="loginButton"
                            className="buttons"
                            value="Login"
                        />
                    </div>
                </form>
                {/* Icons for form fields*/}
                <div style={{ width: 23.99, height: 23.54, left: 110.11, top: 404.44, position: 'absolute' }}>
                    <div style={{ width: 16.35, height: 16.05, left: 1.64, top: 3.21, position: 'absolute' }}>
                        <div style={{ width: 9.68, height: 8.81, left: -0, top: 7.24, position: 'absolute', opacity: 0.40, background: 'rgba(0, 0, 0, 0.50)' }}></div>
                        <div style={{ width: 11.24, height: 11.03, left: 5.11, top: 0, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)' }}></div>
                    </div>
                </div>
                <div style={{ width: 14.17, height: 17.12, left: 111.20, top: 334.90, position: 'absolute' }}>
                    <div style={{ width: 14.17, height: 17.12, left: 0, top: 0, position: 'absolute' }}>
                        <div style={{ width: 8.10, height: 8.56, left: 3.04, top: -0, position: 'absolute', opacity: 0.40, background: 'rgba(0, 0, 0, 0.50)' }}></div>
                        <div style={{ width: 14.17, height: 7.49, left: 0, top: 9.63, position: 'absolute', background: 'rgba(0, 0, 0, 0.50)' }}></div>
                    </div>
                </div>

                <div style={{ width: 439.37, height: 53.50, left: 90.49, top: 585.70, position: 'absolute', background: 'white', border: '1px #4A5568 solid' }} />
                <div style={{ ...commonTextStyle, fontSize: 18, color: '#4A5568', fontWeight: '500', width: 195.15, height: 22.47, left: 213.69, top: 600.75, position: 'absolute' }}>Register New Account</div>

                <div style={{ width: 439.37, height: 1.07, left: 92.67, top: 370.20, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)' }} />
                <div style={{ left: 180, top: 539, position: 'absolute', color: 'black', fontSize: 16, fontFamily: 'Roboto', fontWeight: '400', width: '300px' }}>Forgot password? Click here to reset</div>
                <div style={{ width: 439.37, height: 1.07, left: 92.67, top: 441.89, position: 'absolute', background: 'rgba(102, 126, 234, 0.50)' }} />
                <div style={{ width: 100, height: 100, left: 238, top: 301, position: 'absolute' }} />
                <div style={{ width: 202.79, height: 53.50, left: 691.21, top: 0, position: 'absolute', background: '#667EEA' }} />
                <div style={{ width: 202.79, height: 53.50, left: 467.71, top: 0, position: 'absolute', background: '#4A5568' }} />
                <div style={{ width: 103.57, height: 22.47, left: 751, top: 13, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', wordWrap: 'break-word' }}>Register</div>
                <div style={{ left: 493, top: 13, position: 'absolute', color: 'white', fontSize: 24, fontFamily: 'Roboto', fontWeight: '500', width: '300px' }}>Back to Home</div>
            </div>
        </div>
    );
};

export default LoginUI;
