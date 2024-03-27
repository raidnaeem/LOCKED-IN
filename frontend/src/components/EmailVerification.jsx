import React, { useState, useEffect, useRef } from 'react';
import bp from './Path.js'; // Assuming Path.js exports an object or function

function EmailVerification({ verificationToken }) {
    const [verifyMessage, setMessage] = useState('');
    const isFirstRender = useRef(true);

    useEffect(() => {
        // Ignore the effect on subsequent renders
        if (isFirstRender.current) {
            isFirstRender.current = false;
            
            const verifyEmail = async () => {
                try {
                    // Verify Email Endpoint Call
                    const response = await fetch(bp.buildPath(`api/verify-email/${verificationToken}`), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    const res = await response.text();

                    // Success
                    if (response.status === 200) {
                        setMessage(res);
                    } else {
                        setMessage(res);
                    }
                } catch (e) {
                    alert(e.toString());
                }
            };

            verifyEmail(); // Call the verifyEmail function on the first render
        }

    }, []);

    return (
        <div className='flex justify-center' id="verifyStatus">
            {verifyMessage}
        </div>
    );
}

export default EmailVerification;
