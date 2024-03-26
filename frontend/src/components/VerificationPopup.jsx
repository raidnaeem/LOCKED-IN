import React from 'react';

function VerificationPopup()
{
    function clearNotification(div_id)
    {
        let closeDiv = document.getElementById(div_id);
        if(closeDiv)
        {
            closeDiv.style.display = 'none'
        }
        else
        {
            console.log("no div found to be closed")
        }
    }

   return(
        <div id="verifyNotification" className="bg-gray border-l-4 border-blue text-black p-4 m-1 relative hidden" role="alert">
            <p className="font-bold">Email Verification Needed</p>
            <span className="block sm:inline">Click the link we've sent to the email to finish the registration process</span>
            <span className="absolute top-1/4 bottom-0 right-0 px-4 py-3">
                <svg className="fill-current h-6 w-6 text-black" role="button" onClick={() => clearNotification('verifyNotification')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
        </div>
   );
};

export default VerificationPopup;
