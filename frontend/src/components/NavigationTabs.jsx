import React, {useState} from 'react';
import { FaListCheck, FaSpotify } from "react-icons/fa6";
import { FaCalendarAlt} from "react-icons/fa";
import { RiTimerFill } from "react-icons/ri";
const tabListIcon = require('../assets/tab-list.png');
const tabCalendarIcon = require('../assets/tab-calendar.png');
const tabTimerIcon = require('../assets/tab-timer.png');
const tabSpotifyIcon = require('../assets/tab-spotify.png');


function NavigationTabs(){

    const goToPage = (url) => {
        console.log(url);
        window.location.href = `/${url}`;
    };

    return (   
        <div className='flex justify-end fixed top-0 right-0 mr-4 mt-4'>
            <div className='flex items-center justify-center w-[110px] h-[45px] text-3xl' style={{ backgroundImage: `url(${tabListIcon})` }} onClick={() => goToPage("planner")}>
                <FaListCheck/>
            </div>
            <div className='flex items-center justify-center w-[110px] h-[45px] text-3xl' style={{ backgroundImage: `url(${tabCalendarIcon})` }} onClick={() => goToPage("calendar")}>
                <FaCalendarAlt/>
            </div>
            <div className='flex items-center justify-center w-[110px] h-[45px] text-3xl' style={{ backgroundImage: `url(${tabTimerIcon})` }} onClick={() => goToPage("timer")}>
                <RiTimerFill/>
            </div>
            <div className='flex items-center justify-center w-[110px] h-[45px] text-3xl' style={{ backgroundImage: `url(${tabSpotifyIcon})` }}>
                <FaSpotify/>
            </div>
        </div>
    );
};

export default NavigationTabs;