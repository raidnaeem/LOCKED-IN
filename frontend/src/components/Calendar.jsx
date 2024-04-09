import React from 'react';

const Calendar = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-4/5 md:w-4/5 xl:w-3/5 h-4/5 md:h-[80vh] bg-stone-400 shadow border border-black relative">
                <div className="absolute left-1/4 md:left-24 top-16">
                    <div className="text-center text-white text-5xl font-normal font-montagu-slab">MONTH</div>
                    <div className="text-center text-white text-5xl font-normal font-montagu-slab mt-8">YEAR</div>
                </div>
                <div className="absolute left-20 md:left-80 top-80">
                    <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full transform rotate-180"></div>
                </div>
                <div className="absolute left-24 md:left-24 top-96">
                    <div className="flex items-center">
                        <div className="w-12 h-12 bg-amber-300 rounded-full"></div>
                        <div className="text-white text-3xl font-normal font-roboto ml-4">Add Event</div>
                    </div>
                </div>
                <div className="absolute left-96 md:left-96 top-512">
                    <div className="w-12 h-12 bg-zinc-300 bg-opacity-50 rounded-full"></div>
                </div>
                <div className="absolute left-80 md:left-144 top-936">
                    <div className="flex items-center">
                        <div className="w-14 h-14 bg-amber-300 rounded-full"></div>
                        <div className="w-8 h-8 bg-pink-50 border border-white rounded-full ml-4"></div>
                        <div className="text-white text-3xl font-normal font-roboto ml-4">Search Event</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
