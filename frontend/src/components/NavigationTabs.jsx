import React from 'react';
import { FaListCheck, FaSpotify } from "react-icons/fa6";
import { FaCalendarAlt} from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import './style_tabs.css'


function NavigationTabs({selectedPage}){
    
    const goToPage = (url) => {
        window.location.href = `/${url}`;
    };

    return (   
        <div className='flex'>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#FEF49C] rounded-tl-[500px] rounded-tr-[500px] border-slate-500 border-b-2 ${selectedPage === "planner-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("planner")}>
                <FaListCheck/>
            </div>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#FF7089] rounded-tl-[500px] rounded-tr-[500px] border-slate-500 border-b-2 ${selectedPage === "calendar-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("calendar")}>
                <FaCalendarAlt/>
            </div>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#72B2EE] rounded-tl-[500px] rounded-tr-[500px] border-slate-500 border-b-2 ${selectedPage === "timer-tab" ? 'selected-tab' : ''}`} onClick={() => goToPage("timer")}>
                <RiTimerFill/>
            </div>
            <div className={`flex items-center justify-center w-[120px] h-[45px] text-3xl cursor-pointer bg-[#C9FFB0] rounded-tl-[500px] rounded-tr-[500px] border-slate-500 border-b-2 ${selectedPage === "spotify-tab" ? 'selected-tab' : ''}`}>
                <FaSpotify/>
            </div>
        </div>
    );
};

export default NavigationTabs;