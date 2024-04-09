import React from 'react';

function Calendar() {
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-4/5 md:w-[80%] h-4/5 md:h-[80vh] bg-stone-400 shadow border border-black relative">
        <div className="absolute left-1/4 md:left-[145px] top-[66px]">
            <div className="text-center text-white text-4xl font-normal font-montagu-slab">MONTH</div>
            <div className="text-center text-white text-4xl font-normal font-montagu-slab ml-72">YEAR</div>
        </div>
        <div className="absolute left-[80px] top-[562px]">
            <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full transform rotate-180"></div>
        </div>
        <div className="absolute left-[145px] top-[921px]">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
                <div className="text-white text-2xl font-normal font-roboto ml-3">Add Event</div>
            </div>
        </div>
        <div className="absolute left-[1360px] top-[512px]">
            <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full"></div>
        </div>
        <div className="absolute left-[449px] top-[921px]">
            <div className="flex items-center">
                <div className="w-14 h-14 bg-amber-300 rounded-full"></div>
                <div className="w-8 h-8 bg-pink-50 border border-white rounded-full ml-3"></div>
            </div>
            <div className="text-white text-2xl font-normal font-roboto ml-16">Search Event</div>
        </div>
    </div>
</div>
  );
}

export default Calendar;