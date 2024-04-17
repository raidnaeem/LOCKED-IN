import React from 'react';
import { FaListCheck } from "react-icons/fa6";
import { FaCalendarAlt} from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import './style_tabs.css'


function NavigationTabs({selectedPage}){
    
    const goToPage = (url) => {
        window.location.href = `/${url}`;
    };

    return (   
        <div className='flex absolute right-5 top-[25px] md:top-9'>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#FEF49C] rounded-tl-[500px] rounded-tr-[500px] ${selectedPage === "planner-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("planner")}>
                <FaListCheck/>
            </div>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#FF7089] rounded-tl-[500px] rounded-tr-[500px] ${selectedPage === "calendar-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("calendar")}>
                <FaCalendarAlt/>
            </div>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#72B2EE] rounded-tl-[500px] rounded-tr-[500px] ${selectedPage === "timer-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("timer")}>
                <RiTimerFill/>
            </div>
        </div>
    );
};

export default NavigationTabs;