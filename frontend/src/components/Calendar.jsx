import React from 'react';

const Calendar = () => {
    return (
        <div className="relative bg-stone-400 shadow border border-black w-[80%] md:w-[1440px] h-[80%] md:h-[1024px] mx-auto">
            {/* Container for Month and Year */}
            <div className="absolute left-[145px] top-[66px] md:left-[50%] md:transform md:-translate-x-1/2">
                <div className="text-white text-5xl font-normal font-montagu-slab">MONTH</div>
                <div className="text-white text-5xl font-normal font-montagu-slab mt-4">YEAR</div>
            </div>

            {/* Box 1 - Example: Rotated Box */}
            <div className="absolute left-[80px] top-[562px]">
                <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full transform rotate-180"></div>
            </div>

            {/* Box 2 - Example: Add Event */}
            <div className="absolute left-[145px] top-[921px]">
                <div className="flex items-center">
                    <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
                    <div className="text-white text-3xl font-normal font-roboto ml-4">Add Event</div>
                </div>
            </div>

            {/* Box 3 - Example: Search Event */}
            <div className="absolute left-[1360px] top-[512px]">
                <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full"></div>
            </div>

            {/* Box 4 - Example: Nested Box with Border */}
            <div className="absolute left-[449px] top-[921px]">
                <div className="w-12 h-12 bg-amber-300 rounded-full">
                    <div className="w-8 h-8 bg-pink-50 border border-white rounded-full ml-2"></div>
                </div>
            </div>

            {/* Search Event Text */}
            <div className="absolute left-[521px] top-[913px] text-white text-3xl font-normal font-roboto">
                Search Event
            </div>
        </div>
    );
};

export default Calendar;
