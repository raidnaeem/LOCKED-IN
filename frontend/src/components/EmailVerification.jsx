import React, { useState, useEffect } from 'react';
import bp from './Path.js'; // Assuming Path.js exports an object or function

function EmailVerification({ verificationToken }) {
    const [verifyMessage, setMessage] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Verify Email Endpoint Call
                const response = await fetch(bp.buildPath(`api/verify-email/${verificationToken}`), {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                const res = await response.text();

                // Success
                if (response.status === 200) {
                    // If email verified, navigate to Planner page
                    setMessage(res);
                } else {
                    setMessage(res);
                }
            } catch (e) {
                alert(e.toString());
            }
        };

        verifyEmail(); // Call the verifyEmail function when component mounts

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    return (
        <div id="verifyStatus">
            {verifyMessage}
        </div>
    );
}

export default EmailVerification;
