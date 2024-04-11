import React from 'react';
import { FaListCheck, FaSpotify } from "react-icons/fa6";
import { FaCalendarAlt} from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
import './style_tabs.css'
const tabListIcon = require('../assets/tab-list.png');
const tabCalendarIcon = require('../assets/tab-calendar.png');
const tabTimerIcon = require('../assets/tab-timer.png');
const tabSpotifyIcon = require('../assets/tab-spotify.png');


function NavigationTabs({selectedPage}){
    
    const goToPage = (url) => {
        window.location.href = `/${url}`;
    };

    return (   
        <div className='flex justify-end fixed top-0 right-0 mr-4 mt-4'>
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